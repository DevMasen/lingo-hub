# Lingo Hub — API Contract

> Supersedes the previous `docs/api.md`, which was a generic starter template and does not
> reflect the actual implementation. This document describes:
> 1. **Current**: how the frontend actually talks to Supabase today, via `src/api/services/*.service.js`.
> 2. **Future**: the Django REST endpoint each service function will call after migration, chosen so
>    that only the *bodies* of the service functions need to change — call sites, hooks, and
>    components stay untouched.

---

## 0. Design contract between frontend and backend

- The frontend never talks to a backend directly from components/hooks. Every call goes through
  `src/api/services/*.service.js`, which returns **camelCase domain objects** (see §1) and throws
  a single **`ApiError`** shape (see §2), regardless of backend.
- **Recommendation for the Django implementation:** serialize responses in camelCase (e.g. via
  `djangorestframework-camel-case` or manual `to_camel_case` serializer fields) so that
  `src/api/mappers/*.mapper.js` becomes a thin pass-through instead of needing a rewrite. All
  request/response bodies below are shown in the camelCase shape the frontend expects; adjust if
  you decide to keep snake_case on the wire and camelCase only in the mapper layer instead.
- Auth: Supabase issues a JWT (`access_token`) via `supabase-js`, attached to requests
  automatically by the client SDK. Django should issue an equivalent bearer JWT
  (`Authorization: Bearer <token>`, e.g. via `djangorestframework-simplejwt`) so `getCurrentSession`
  / session handling in `useSession` needs minimal changes.

---

## 1. Domain types

These are the shapes every service function returns today (see `src/api/types/*.types.js`) and
that Django responses should match.

### Session (not persisted as a table — derived from auth state)
```ts
{
  userId: string,          // UUID
  role: string,             // e.g. "authenticated"
  email?: string,
  phone?: string,
  accessToken: string,
  isEmailConfirmed: boolean
}
```

### Room
```ts
{
  id: number,
  roomName: string,
  reservePricePerHalfHour: number,   // Tomans
  status?: 'active' | 'out_of_service'
}
```

### Reservation
```ts
{
  id: number,
  userId: string,                 // UUID, FK -> Profile
  roomId: number,                 // FK -> Room
  reservationDate: string,        // ISO date, e.g. "2026-07-18"
  timePart: number,               // 0-9, half-hour slot index (see mapTime.js)
  status: 'reserved' | 'canceled' | 'waiting' | 'out_of_service'
}
```

### Profile
```ts
{
  id: string,                     // UUID, matches auth user id
  firstName: string,
  lastName: string,
  phoneNumber: string,
  language: string,
  level: string,
  explanation: string,
  signupStatus: 'confirmed' | 'pending' | 'rejected',
  creditBalance: number,          // Tomans, never negative
  maxReserveCount: number,
  avatarUrl: string,
  resumeUrl: string
  // NOTE: email is intentionally absent here — it lives on the auth
  // record/session, not the profile row.
}
```

### NewsItem
```ts
{
  id: number,
  label: string,
  body: string,
  publishedAt: string             // ISO 8601 timestamp
}
```

---

## 2. Error shape

Every service function throws `ApiError` (`src/api/errors/apiError.js`), never a raw
Supabase/Django error:

```ts
{
  name: 'ApiError',
  message: string,   // human-readable, safe to show in the UI (Farsi)
  code: string,       // machine-readable
  status: number | null,
  cause: unknown       // original raw error, for logging only
}
```

Codes currently mapped from Supabase, and the equivalent Django/DRF condition they should map
from:

| code               | Meaning                          | Current Supabase trigger              | Django equivalent (future)                          |
| ------------------- | --------------------------------- | -------------------------------------- | ----------------------------------------------------- |
| `DUPLICATE`         | Unique constraint violation       | Postgres `23505`                       | `IntegrityError` / DRF `ValidationError` on unique field |
| `INVALID_REFERENCE` | FK violation / referenced row gone | Postgres `23503`                       | `IntegrityError` on FK / DRF 400 on invalid FK id      |
| `UNAUTHORIZED`      | Bad credentials                    | Supabase Auth "Invalid login credentials" | DRF `AuthenticationFailed` / 401                     |
| `NOT_FOUND`         | Row doesn't exist                  | `.single()` returning no row (PostgREST) | DRF `Http404` / 404                                  |
| `UNKNOWN`           | Anything else                      | fallback                               | fallback (500 or unhandled 4xx)                       |

Future Django responses should use a body shape the frontend's `fromDjangoError` (to be added
alongside `fromSupabaseError`) can map 1:1 onto the table above, e.g.:

```json
{ "code": "DUPLICATE", "message": "این گزارش از قبل وجود دارد.", "status": 409 }
```

---

## 3. Auth (`src/api/services/auth.service.js`)

### `signUp({ email, password, profile })`
- **Current:** `supabase.auth.signUp({ email, password })`, then `createProfile({ id: userId, ...profile })` (§5). Returns `{ session: Session | null, profile: Profile }`. `session` is `null` until the user confirms their email if "Confirm email" is enabled.
- **Future — `POST /api/auth/signup`**
  - Request: `{ email, password, profile: NewProfile }` (NewProfile = Profile minus `id`, `avatarUrl`, `resumeUrl` optional)
  - Response `201`: `{ session: Session | null, profile: Profile }`
  - Errors: `DUPLICATE` (email already registered)

### `resendEmailConfirmation(email)`
- **Current:** `supabase.auth.resend({ type: 'signup', email })`
- **Future — `POST /api/auth/email/resend-confirmation`**
  - Request: `{ email: string }` → Response `200`, empty body

### `signIn(email, password)`
- **Current:** `supabase.auth.signInWithPassword({ email, password })` → `Session`
- **Future — `POST /api/auth/login`**
  - Request: `{ email: string, password: string }`
  - Response `200`: `Session`
  - Errors: `UNAUTHORIZED`

### `sendOtp({ channel, value, createUserIfMissing = true })`
- **Current:** `supabase.auth.signInWithOtp(...)`, `channel` is `'email' | 'phone'`, `value` is the address/number.
- **Future — `POST /api/auth/otp/send`**
  - Request: `{ channel: 'email' | 'phone', value: string, createUserIfMissing?: boolean }`
  - Response `200`, empty body

### `verifyOtp({ channel, value, code })`
- **Current:** `supabase.auth.verifyOtp(...)` → `Session`
- **Future — `POST /api/auth/otp/verify`**
  - Request: `{ channel: 'email' | 'phone', value: string, code: string }`
  - Response `200`: `Session`
  - Errors: `UNAUTHORIZED` (invalid code), `410`/custom code (expired code — not currently
    distinguished in `fromSupabaseError`; recommend adding an `EXPIRED_OTP` code in Django)

### `getCurrentSession()`
- **Current:** `supabase.auth.getSession()` → `Session | null`
- **Future — `GET /api/auth/session`**
  - Response `200`: `Session | null` (`null`/`204` if not authenticated)

### `onAuthStateChange(callback)`
- **Current:** client-side only — `supabase.auth.onAuthStateChange(...)`, returns an unsubscribe function. Not a network call.
- **Future:** no direct REST equivalent. Recommend the frontend keep this as a thin client-side wrapper around token refresh / logout events rather than a server push; if real-time push is desired later, this is the one place a websocket/SSE channel would slot in — out of scope for the initial Django migration.

### `signOut()`
- **Current:** `supabase.auth.signOut()`
- **Future — `POST /api/auth/logout`** → `200`, empty body (blacklist/rotate refresh token)

### `requestPasswordReset(email, { redirectTo })`
- **Current:** `supabase.auth.resetPasswordForEmail(email, { redirectTo })`
- **Future — `POST /api/auth/password/reset-request`**
  - Request: `{ email: string, redirectTo?: string }` → `200`, empty body

### `completePasswordReset(newPassword)`
- **Current:** `supabase.auth.updateUser({ password: newPassword })`, relies on a temporary
  recovery session already established client-side after the user clicks the emailed link.
- **Future — `POST /api/auth/password/reset-complete`**
  - Request: `{ resetToken: string, newPassword: string }` (Django will need an explicit token
    param since it won't have Supabase's implicit "recovery session" mechanism)
  - Response `200`: `Session`

### `changePassword({ newPassword, currentPassword })`
- **Current:** `supabase.auth.updateUser({ password, current_password })`, user already logged in.
- **Future — `PATCH /api/auth/password`** (auth required)
  - Request: `{ newPassword: string, currentPassword?: string }`
  - Response `200`: `Session`
  - Errors: `UNAUTHORIZED` (wrong `currentPassword`)

---

## 4. Rooms (`src/api/services/rooms.service.js`)

### `getAllRooms()`
- **Current:** `supabase.from('rooms').select('*').order('room_name')`
- **Future — `GET /api/rooms`** (auth required) → `200`: `Room[]`, ordered by `roomName`

### `getRoomById(roomId)`
- **Current:** `supabase.from('rooms').select('*').eq('id', roomId).single()`
- **Future — `GET /api/rooms/:roomId`** → `200`: `Room` / `NOT_FOUND`

### `updateRoom(roomId, changes)`  — admin
- `changes` is a partial `{ reservePricePerHalfHour?, status? }`
- **Future — `PATCH /api/rooms/:roomId`** (admin) → `200`: `Room`

### `createRoom(room)` — admin
- `room` = `NewRoom` (Room minus `id`)
- **Future — `POST /api/rooms`** (admin) → `201`: `Room`

---

## 5. Reservations (`src/api/services/reservations.service.js`)

### `getReservationsForRoomOnDate(roomId, date)`
- **Current:** `supabase.from('reservations').select('*').eq('room_id', roomId).eq('reservation_date', date).order('created_at', desc)`. Used to render the per-room time-slot grid — includes **all** reservations for that room/date regardless of owner (needed to show which slots are taken by *other* users).
- **Future — `GET /api/rooms/:roomId/reservations?date=YYYY-MM-DD`**
  - Response `200`: `Reservation[]`
  - ⚠️ **Privacy note (carried over from prior audit):** this endpoint intentionally exposes
    which slots are taken, but should **not** leak other users' `userId` to the client beyond
    what's needed to render "available vs. taken." Recommend Django only include `userId` in the
    response when it equals the requesting user's own id, and use a boolean/opaque marker
    (e.g. `"taken"`) for other users' slots — mirroring the ProtectedRoute/OTP fixes already
    applied elsewhere in the audit.

### `getReservationsByUser(userId)`
- **Current:** `supabase.from('reservations').select('*').eq('user_id', userId).order('reservation_date', desc)`
- **Future — `GET /api/users/:userId/reservations`** (auth required; user can only fetch their own unless admin)
  - Response `200`: `Reservation[]`

### `createReservation(reservation)`
- `reservation` = `NewReservation` (Reservation minus `id`)
- **Current:** `supabase.from('reservations').insert(row).select().single()`
- **Future — `POST /api/reservations`**
  - Request: `{ userId, roomId, reservationDate, timePart, status }` (server should also enforce
    `maxReserveCount` and slot-availability server-side, not just trust the client)
  - Response `201`: `Reservation`
  - Errors: `409 SLOT_TAKEN`, `403 MAX_RESERVE_REACHED` (server-side checks; not currently
    enforced client-side beyond `useReserveRemainCount`'s local count)

### `cancelReservation(reservationId)`
- **Current:** `supabase.from('reservations').update({ status: 'canceled' }).eq('id', reservationId).select().single()` — soft-cancel, preserves history (never a hard delete).
- **Future — `PATCH /api/reservations/:reservationId/cancel`**
  - Response `200`: `Reservation` (status `canceled`)
  - Errors: `403 NOT_YOUR_RESERVATION`, `NOT_FOUND`

### `submitReservation(reservationId)`
- **Current:** `supabase.from('reservations').update({ status: 'reserved' }).eq('id', reservationId).select().single()` — called after successful wallet payment (see `ConfirmPayment.jsx`), moves a reservation from `waiting` → `reserved`.
- **Future — `PATCH /api/reservations/:reservationId/submit`**
  - Response `200`: `Reservation` (status `reserved`)
  - Note: on Django this should ideally happen server-side as part of the payment-confirmation
    transaction (atomic with the balance deduction below), not as two separate client-driven calls.

---

## 6. Users / Profiles (`src/api/services/profiles.service.js`)

### `getProfileById(userId)`
- **Current:** `supabase.from('profiles').select('*').eq('id', userId).single()`
- **Future — `GET /api/users/:userId`** → `200`: `Profile` / `NOT_FOUND`

### `createProfile(profile)`
- `profile` = `NewProfile`, **must** be called with an `id` that already exists in the auth
  system — profiles never self-generate an id.
- **Future — `POST /api/users`** (internal — typically called by the signup flow, not exposed
  as a standalone public endpoint) → `201`: `Profile`

### `updateProfile(userId, changes, avatarFile, resumeFile)`
- `changes` is a partial `Profile` (any subset of fields except `id`).
- **Current:** three sequential steps if files are present:
  1. `supabase.from('profiles').update(row).eq('id', userId)` for text fields
  2. `supabase.storage.from('avatars').upload(...)` + a second `update` call to set `avatarUrl`
  3. `supabase.storage.from('resumes').upload(...)` + a third `update` call to set `resumeUrl`
- **Future — `PATCH /api/users/:userId`** (multipart/form-data when files are attached)
  - Request: multipart body with `changes` (JSON part) + optional `avatar` file + optional `resume` file
  - Response `200`: `Profile`
  - Recommend Django do this as **one** transactional request instead of the current 3
    round-trips — the multi-step Supabase flow is a storage-API limitation, not a desired shape.

### `adjustCreditBalance(userId, delta)`
- **Current:** read-then-write — `getProfileById` then `updateProfile(userId, { creditBalance: current + delta })`. Documented in the source as having a race condition under concurrent calls (e.g. two open tabs), acceptable for now but flagged for a future atomic fix.
- **Future — `POST /api/users/:userId/balance/adjust`**
  - Request: `{ delta: number }` (positive = credit, negative = debit)
  - Response `200`: `{ newBalance: number }` or full `Profile`
  - Django should implement this as an atomic `F()`-expression update
    (`credit_balance = credit_balance + delta`) or a DB-level transaction with a row lock,
    fixing the race condition inherent in the current read-then-write Supabase implementation.
    Should also reject if the resulting balance would go negative.

---

## 7. News (`src/api/services/news.service.js`)

Read endpoints are public/all-users; write endpoints are admin-only. **Note:** access control is
currently enforced via Supabase Row Level Security policies on the `news` table, not in the
service file itself — this must be reimplemented as explicit Django permission checks
(`IsAdminUser` or a custom permission class), since Django has no RLS equivalent by default.

### `getLatestNews(limit?)`
- **Current:** `supabase.from('news').select('*').order('published_at', desc)`, optionally `.limit(limit)`
- **Future — `GET /api/news?limit=10`** → `200`: `NewsItem[]`

### `getNewsById(newsId)`
- **Future — `GET /api/news/:newsId`** → `200`: `NewsItem` / `NOT_FOUND`

### `createNewsItem(newsItem)` — admin
- `newsItem` = `NewNewsItem` (NewsItem minus `id`)
- **Future — `POST /api/news`** (admin) → `201`: `NewsItem`

### `updateNewsItem(newsId, changes)` — admin
- `changes`: partial `{ label?, body? }`
- **Future — `PATCH /api/news/:newsId`** (admin) → `200`: `NewsItem`

### `deleteNewsItem(newsId)` — admin
- **Current:** hard delete (unlike reservations, no soft-cancel — no need to retain history).
- **Future — `DELETE /api/news/:newsId`** (admin) → `204`

---

## 8. Summary table (quick reference)

| Service function                | Django endpoint                                  | Method |
| -------------------------------- | -------------------------------------------------- | ------ |
| `signUp`                         | `/api/auth/signup`                                  | POST   |
| `resendEmailConfirmation`        | `/api/auth/email/resend-confirmation`               | POST   |
| `signIn`                         | `/api/auth/login`                                   | POST   |
| `sendOtp`                        | `/api/auth/otp/send`                                | POST   |
| `verifyOtp`                      | `/api/auth/otp/verify`                              | POST   |
| `getCurrentSession`              | `/api/auth/session`                                 | GET    |
| `signOut`                        | `/api/auth/logout`                                  | POST   |
| `requestPasswordReset`           | `/api/auth/password/reset-request`                  | POST   |
| `completePasswordReset`          | `/api/auth/password/reset-complete`                 | POST   |
| `changePassword`                 | `/api/auth/password`                                | PATCH  |
| `getAllRooms`                    | `/api/rooms`                                        | GET    |
| `getRoomById`                    | `/api/rooms/:roomId`                                | GET    |
| `updateRoom`                     | `/api/rooms/:roomId`                                | PATCH  |
| `createRoom`                     | `/api/rooms`                                        | POST   |
| `getReservationsForRoomOnDate`   | `/api/rooms/:roomId/reservations?date=`             | GET    |
| `getReservationsByUser`          | `/api/users/:userId/reservations`                   | GET    |
| `createReservation`              | `/api/reservations`                                 | POST   |
| `cancelReservation`              | `/api/reservations/:reservationId/cancel`           | PATCH  |
| `submitReservation`              | `/api/reservations/:reservationId/submit`           | PATCH  |
| `getProfileById`                 | `/api/users/:userId`                                | GET    |
| `createProfile`                  | `/api/users`                                        | POST   |
| `updateProfile`                  | `/api/users/:userId`                                | PATCH  |
| `adjustCreditBalance`            | `/api/users/:userId/balance/adjust`                 | POST   |
| `getLatestNews`                  | `/api/news?limit=`                                  | GET    |
| `getNewsById`                    | `/api/news/:newsId`                                 | GET    |
| `createNewsItem`                 | `/api/news`                                         | POST   |
| `updateNewsItem`                 | `/api/news/:newsId`                                 | PATCH  |
| `deleteNewsItem`                 | `/api/news/:newsId`                                 | DELETE |

---

## 9. Open items to resolve before/during Django migration

1. **Server-side reservation validation** — slot-taken and max-reserve-count checks currently
   live only in the frontend (`useReserveRemainCount`); Django must enforce these server-side.
2. **Atomic balance updates** — `adjustCreditBalance` is read-then-write today; Django should do
   this atomically.
3. **Payment/submit transaction** — `ConfirmPayment.jsx` calls `updateUserBalance` then
   `submitReservation` as two separate client-driven mutations; Django should expose a single
   transactional "pay for reservation" endpoint instead once payment integration is real.
4. **Room-availability privacy** — decide and implement the "own userId visible, others opaque"
   rule for `GET /api/rooms/:roomId/reservations`.
5. **News RLS → Django permissions** — reimplement the current Supabase RLS admin-only write
   restriction as explicit DRF permission classes.
6. **OTP expiry** — Supabase's `EXPIRED_OTP` case isn't currently distinguished in
   `fromSupabaseError`; Django's OTP implementation should return a distinct `EXPIRED_OTP` code
   from the start.
