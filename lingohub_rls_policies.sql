-- =============================================================================
-- LingoHub — Row Level Security (RLS) Policy Set
-- =============================================================================
-- Run this in the Supabase SQL editor as service_role (or via the Supabase
-- migration CLI). Idempotent-ish: uses DROP POLICY IF EXISTS before each
-- CREATE POLICY so it can be re-run safely during development.
--
-- Covers:
--   0. Helper: is_admin()
--   1. profiles        (incl. role self-escalation fix)
--   2. rooms
--   3. reservations     (incl. get_room_reservations privacy RPC)
--   4. news
--   5. tickets          (support feature — not yet covered by prior audit)
--   6. notifications    
--   7. storage: avatars bucket
--   8. storage: resumes bucket (see chat notes on public vs private)
-- =============================================================================


-- =============================================================================
-- 0. HELPER FUNCTION: is_admin()
-- =============================================================================
-- SECURITY DEFINER so it can read profiles.role even under a caller whose
-- own SELECT policy might not (theoretically) cover every row. Marked STABLE
-- since it doesn't mutate data — lets Postgres cache the result within a
-- single statement.

create or replace function public.is_admin()
returns boolean
language sql
security definer
set search_path = public
stable
as $$
  select exists (
    select 1
    from public.profiles
    where id = auth.uid()
      and role = 'admin'
  );
$$;

revoke all on function public.is_admin() from public;
grant execute on function public.is_admin() to authenticated;


-- =============================================================================
-- 1. PROFILES
-- =============================================================================

alter table public.profiles enable row level security;

-- SELECT: a user can see their own profile; admins can see everyone's
-- (needed for the admin panel and for is_admin() lookups elsewhere).
drop policy if exists "profiles_select_own_or_admin" on public.profiles;
create policy "profiles_select_own_or_admin"
on public.profiles
for select
to authenticated
using (
  id = auth.uid()
  or public.is_admin()
);

-- INSERT: only allowed to create the row matching your own auth id.
-- This is what createProfile() calls right after supabase.auth.signUp().
drop policy if exists "profiles_insert_own" on public.profiles;
create policy "profiles_insert_own"
on public.profiles
for insert
to authenticated
with check (id = auth.uid());

-- UPDATE: a user can update their own row; admins can update any row.
-- IMPORTANT: this alone would let a user set their own role='admin' or
-- forge their own credit_balance via updateProfile(). RLS's WITH CHECK
-- clause can't compare against the pre-update value of a column, so the
-- self-escalation fix is a trigger (below), not the policy itself.
drop policy if exists "profiles_update_own_or_admin" on public.profiles;
create policy "profiles_update_own_or_admin"
on public.profiles
for update
to authenticated
using (
  id = auth.uid()
  or public.is_admin()
)
with check (
  id = auth.uid()
  or public.is_admin()
);

-- Trigger: block a non-admin from changing their own `role` OR
-- `credit_balance` OR `max_reserve_count` via a direct .update() call.
-- These three columns should only ever be admin-authored (role, max
-- reserve count) or system-authored via adjustCreditBalance's intended
-- server-side path (credit_balance). Silently resets to the old value
-- rather than raising, so a legitimate multi-field update() (e.g. from
-- UpdateAvatarForm) doesn't fail — it just can't smuggle in the sensitive
-- fields.
create or replace function public.prevent_profile_privilege_escalation()
returns trigger
language plpgsql
security definer
set search_path = public
as $$
begin
  if not public.is_admin() then
    if NEW.role is distinct from OLD.role then
      NEW.role := OLD.role;
    end if;
    if NEW.credit_balance is distinct from OLD.credit_balance then
      NEW.credit_balance := OLD.credit_balance;
    end if;
    if NEW.max_reserve_count is distinct from OLD.max_reserve_count then
      NEW.max_reserve_count := OLD.max_reserve_count;
    end if;
    if NEW.signup_status is distinct from OLD.signup_status then
      NEW.signup_status := OLD.signup_status;
    end if;
  end if;
  return NEW;
end;
$$;

drop trigger if exists trg_prevent_profile_privilege_escalation on public.profiles;
create trigger trg_prevent_profile_privilege_escalation
before update on public.profiles
for each row
execute function public.prevent_profile_privilege_escalation();

-- No DELETE policy is defined on purpose — profiles should never be
-- client-deletable. Deleting a user should go through a Supabase Auth
-- admin action (which can cascade via auth.users FK) or a dedicated
-- SECURITY DEFINER RPC restricted to admins, not raw table access.


-- =============================================================================
-- 2. ROOMS
-- =============================================================================

alter table public.rooms enable row level security;

-- SELECT: any authenticated user can read the room list (needed to render
-- the booking grid). Rooms have no sensitive per-user data.
drop policy if exists "rooms_select_authenticated" on public.rooms;
create policy "rooms_select_authenticated"
on public.rooms
for select
to authenticated
using (true);

-- INSERT/UPDATE: admin-only (createRoom / updateRoom in rooms.service.js).
drop policy if exists "rooms_insert_admin" on public.rooms;
create policy "rooms_insert_admin"
on public.rooms
for insert
to authenticated
with check (public.is_admin());

drop policy if exists "rooms_update_admin" on public.rooms;
create policy "rooms_update_admin"
on public.rooms
for update
to authenticated
using (public.is_admin())
with check (public.is_admin());


-- =============================================================================
-- 3. RESERVATIONS
-- =============================================================================

alter table public.reservations enable row level security;

-- SELECT: a user can only directly SELECT their own reservation rows.
-- This intentionally does NOT allow a user to see other users' rows via
-- a raw `select('*').eq('room_id', ...)` query the way
-- getReservationsForRoomOnDate() currently does — that flow must be
-- migrated to call get_room_reservations() (below) instead, which is the
-- privacy-safe path (own userId visible, others opaque).
drop policy if exists "reservations_select_own_or_admin" on public.reservations;
create policy "reservations_select_own_or_admin"
on public.reservations
for select
to authenticated
using (
  user_id = auth.uid()
  or public.is_admin()
);

-- INSERT: a user may only create a reservation for themselves.
-- Slot-availability and max-reserve-count are NOT enforced here (Postgres
-- RLS can't easily express "no overlapping row exists" as a WITH CHECK
-- without a race-prone subquery) — enforce via a unique constraint on
-- (room_id, reservation_date, time_part) WHERE status != 'canceled', plus
-- a trigger or the future Django migration's server-side check.
drop policy if exists "reservations_insert_own" on public.reservations;
create policy "reservations_insert_own"
on public.reservations
for insert
to authenticated
with check (user_id = auth.uid());

-- UPDATE: a user may update (cancel / mark waiting->reserved) only their
-- own reservations; admins may update any (e.g. marking out_of_service).
drop policy if exists "reservations_update_own_or_admin" on public.reservations;
create policy "reservations_update_own_or_admin"
on public.reservations
for update
to authenticated
using (
  user_id = auth.uid()
  or public.is_admin()
)
with check (
  user_id = auth.uid()
  or public.is_admin()
);

-- Recommended unique constraint to actually prevent double-booking a slot
-- (belt-and-suspenders alongside the future server-side check):
-- create unique index if not exists reservations_unique_active_slot
--   on public.reservations (room_id, reservation_date, time_part)
--   where status in ('reserved', 'waiting');

-- Privacy-safe RPC for the per-room/per-day grid. Mirrors the "own userId
-- visible, others opaque" rule from docs/api.md §5. getReservationsForRoomOnDate()
-- in reservations.service.js should call supabase.rpc('get_room_reservations', ...)
-- instead of a raw select once this lands.
create or replace function public.get_room_reservations(
  p_room_id bigint,
  p_date date
)
returns table (
  id bigint,
  user_id uuid,
  room_id bigint,
  reservation_date date,
  time_part smallint,
  status text
)
language sql
security definer
set search_path = public
stable
as $$
  select
    r.id,
    case when r.user_id = auth.uid() then r.user_id else null end as user_id,
    r.room_id,
    r.reservation_date,
    r.time_part,
    r.status
  from public.reservations r
  where r.room_id = p_room_id
    and r.reservation_date = p_date;
$$;

revoke all on function public.get_room_reservations(bigint, date) from public;
grant execute on function public.get_room_reservations(bigint, date) to authenticated;


-- =============================================================================
-- 4. NEWS
-- =============================================================================

alter table public.news enable row level security;

-- SELECT: public read (news feed is shown to every logged-in user).
drop policy if exists "news_select_authenticated" on public.news;
create policy "news_select_authenticated"
on public.news
for select
to authenticated
using (true);

-- INSERT/UPDATE/DELETE: admin-only.
drop policy if exists "news_insert_admin" on public.news;
create policy "news_insert_admin"
on public.news
for insert
to authenticated
with check (public.is_admin());

drop policy if exists "news_update_admin" on public.news;
create policy "news_update_admin"
on public.news
for update
to authenticated
using (public.is_admin())
with check (public.is_admin());

drop policy if exists "news_delete_admin" on public.news;
create policy "news_delete_admin"
on public.news
for delete
to authenticated
using (public.is_admin());


-- =============================================================================
-- 5. TICKETS (support feature)
-- =============================================================================
-- Present in the codebase (tickets.service.js, TicketForm/TicketList) but
-- not covered by the prior RLS audit — closing that gap here.

alter table public.tickets enable row level security;

-- SELECT: a user sees only their own tickets; admins see all (for a
-- future support/admin queue).
drop policy if exists "tickets_select_own_or_admin" on public.tickets;
create policy "tickets_select_own_or_admin"
on public.tickets
for select
to authenticated
using (
  user_id = auth.uid()
  or public.is_admin()
);

-- INSERT: a user may only file a ticket as themselves, and must start
-- 'open' (prevents a client from filing a pre-closed/pre-triaged ticket).
drop policy if exists "tickets_insert_own" on public.tickets;
create policy "tickets_insert_own"
on public.tickets
for insert
to authenticated
with check (
  user_id = auth.uid()
  and status = 'open'
);

-- UPDATE: status changes (triage/close) are admin-only — regular users
-- have no update path today (TicketList is read-only), so this is
-- deliberately admin-only rather than "own row."
drop policy if exists "tickets_update_admin" on public.tickets;
create policy "tickets_update_admin"
on public.tickets
for update
to authenticated
using (public.is_admin())
with check (public.is_admin());


-- =============================================================================
-- 6. NOTIFICATIONS 
-- =============================================================================
alter table public.notifications enable row level security;

-- SELECT: a user sees only their own notifications.
drop policy if exists "notifications_select_own" on public.notifications;
create policy "notifications_select_own"
on public.notifications
for select
to authenticated
using (user_id = auth.uid());

-- UPDATE: a user may mark their own notifications read/unread, but must
-- not be able to change who a notification belongs to, its content, or
-- its type — only is_read is meant to be user-editable.
create or replace function public.restrict_notification_update()
returns trigger
language plpgsql
security definer
set search_path = public
as $$
begin
  if NEW.user_id is distinct from OLD.user_id
     or NEW.type is distinct from OLD.type
     or NEW.title is distinct from OLD.title
     or NEW.body is distinct from OLD.body
     or NEW.created_at is distinct from OLD.created_at
  then
    raise exception 'Only is_read may be updated on notifications';
  end if;
  return NEW;
end;
$$;

drop trigger if exists trg_restrict_notification_update on public.notifications;
create trigger trg_restrict_notification_update
before update on public.notifications
for each row
execute function public.restrict_notification_update();

drop policy if exists "notifications_update_own" on public.notifications;
create policy "notifications_update_own"
on public.notifications
for update
to authenticated
using (user_id = auth.uid())
with check (user_id = auth.uid());

-- INSERT: deliberately NO policy for `authenticated`. Rows are created
-- exclusively by DB triggers (e.g. AFTER INSERT on reservations/tickets)
-- whose trigger functions run as the table owner and therefore bypass RLS
-- automatically — no client, including an admin, can directly insert a
-- notification for another user. If you later want admins to be able to
-- manually push a notification (e.g. a broadcast), add an explicit
-- admin-only INSERT policy at that point rather than opening it broadly.

-- Example trigger wiring (adjust to your actual reservation lifecycle):
-- create or replace function public.notify_on_reservation_status_change()
-- returns trigger
-- language plpgsql
-- security definer
-- set search_path = public
-- as $$
-- begin
--   if NEW.status is distinct from OLD.status then
--     insert into public.notifications (user_id, type, title, body)
--     values (
--       NEW.user_id,
--       'reservation_status',
--       'وضعیت رزرو شما تغییر کرد',
--       'رزرو شما به وضعیت ' || NEW.status || ' تغییر یافت.'
--     );
--   end if;
--   return NEW;
-- end;
-- $$;
--
-- drop trigger if exists trg_notify_on_reservation_status_change on public.reservations;
-- create trigger trg_notify_on_reservation_status_change
-- after update on public.reservations
-- for each row
-- execute function public.notify_on_reservation_status_change();


-- =============================================================================
-- 7. STORAGE — avatars bucket
-- =============================================================================
-- Avatars are fine as a PUBLIC bucket: they're meant to be publicly
-- viewable (profile pictures shown in headers, etc.), low sensitivity.
-- RLS still governs who can WRITE to the bucket.
--
-- Convention assumed: object path/name is `avatar-<user_id>-<random>`,
-- matching profiles.service.js's current naming (`avatar-${data1.id}-...`).
-- storage.objects.name is the object key (no bucket prefix).

drop policy if exists "avatars_public_read" on storage.objects;
create policy "avatars_public_read"
on storage.objects
for select
to public
using (bucket_id = 'avatars');

drop policy if exists "avatars_owner_write" on storage.objects;
create policy "avatars_owner_write"
on storage.objects
for insert
to authenticated
with check (
  bucket_id = 'avatars'
  and name like 'avatar-' || auth.uid()::text || '-%'
);

drop policy if exists "avatars_owner_update" on storage.objects;
create policy "avatars_owner_update"
on storage.objects
for update
to authenticated
using (
  bucket_id = 'avatars'
  and name like 'avatar-' || auth.uid()::text || '-%'
)
with check (
  bucket_id = 'avatars'
  and name like 'avatar-' || auth.uid()::text || '-%'
);

drop policy if exists "avatars_owner_delete" on storage.objects;
create policy "avatars_owner_delete"
on storage.objects
for delete
to authenticated
using (
  bucket_id = 'avatars'
  and name like 'avatar-' || auth.uid()::text || '-%'
);


-- =============================================================================
-- 8. STORAGE — resumes bucket
-- =============================================================================
-- See the chat response for the public-vs-private discussion. This section
-- assumes you switch the bucket to PRIVATE (public = false) and serve
-- files exclusively via short-lived signed URLs. The RLS policies below
-- are what make that safe: they control who can read/write the underlying
-- objects regardless of bucket-level public/private setting, but a
-- private bucket adds a second layer so a leaked/guessed object path
-- alone isn't enough to view the file.
--
-- Convention assumed: object path is `resume-<user_id>-<random>`,
-- matching the current `resume-${data1.id}-...` naming.

-- SELECT: owner can read their own resume object (needed to generate a
-- signed URL for themselves, e.g. "view my uploaded resume"); admins can
-- read any resume (needed for the admin review flow).
drop policy if exists "resumes_owner_or_admin_read" on storage.objects;
create policy "resumes_owner_or_admin_read"
on storage.objects
for select
to authenticated
using (
  bucket_id = 'resumes'
  and (
    name like 'resume-' || auth.uid()::text || '-%'
    or public.is_admin()
  )
);

-- INSERT: only the owner can upload a resume under their own path.
drop policy if exists "resumes_owner_write" on storage.objects;
create policy "resumes_owner_write"
on storage.objects
for insert
to authenticated
with check (
  bucket_id = 'resumes'
  and name like 'resume-' || auth.uid()::text || '-%'
);

-- UPDATE/DELETE: owner can replace/remove their own resume.
drop policy if exists "resumes_owner_update" on storage.objects;
create policy "resumes_owner_update"
on storage.objects
for update
to authenticated
using (
  bucket_id = 'resumes'
  and name like 'resume-' || auth.uid()::text || '-%'
)
with check (
  bucket_id = 'resumes'
  and name like 'resume-' || auth.uid()::text || '-%'
);

drop policy if exists "resumes_owner_delete" on storage.objects;
create policy "resumes_owner_delete"
on storage.objects
for delete
to authenticated
using (
  bucket_id = 'resumes'
  and name like 'resume-' || auth.uid()::text || '-%'
);

-- Reminder: switching the bucket to private (dashboard: Storage > resumes
-- > Edit bucket > Public: off) does NOT retroactively invalidate the
-- permanent public URLs already stored in profiles.resume_url. Those
-- rows need a data migration — see chat notes.
