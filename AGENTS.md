# AGENTS.md

## Purpose

This file gives AI coding agents the minimal, actionable project knowledge needed to work productively in this repo.

## Key repo facts

- Frontend is a React 19 + Vite app under `frontend/`.
- Backend today is Supabase; the frontend uses a backend access layer under `frontend/src/api/`.
- No test runner is configured.

## Primary sources

- `CLAUDE.md` — architecture, conventions, and stack details.
- `docs/api.md` — full API contract: current Supabase behavior + planned Django REST shape, per resource.
- `frontend/package.json` — install/build scripts and dependencies.
- `frontend/src/api/` — the service/mappers pattern and the current data access seam.
- `frontend/src/features/` — feature folder structure for hooks and components.

## Build / run commands

Use the frontend folder for commands.

- `cd frontend && npm run dev`
- `cd frontend && npm run build`
- `cd frontend && npm run lint`
- `cd frontend && npm run preview`

## Important conventions for AI changes

- Only `frontend/src/api/services/*.service.js` may import `supabase` or call `supabase.from(...)`.
- Use `frontend/src/api/mappers/*.mapper.js` for snake_case ↔ camelCase conversion.
- New data access should be exposed through feature-level `useX` hooks and should use React Query + `useError` from `frontend/src/hooks/useError.js`.
- UI components should reuse existing helpers in `frontend/src/utils/` for Persian digit/date formatting and numeric input.
- Follow the repo's comment convention in component files: `//! Context`, `//! React Query`, `//! Handlers`, `//! Conditional JSX`, `//! Main JSX`.
- Use `var(--color-slate-*)` for theme-adaptive colors and raw hex values only for constant accent colors.
- App-level admin status is `profiles.role === 'admin'`, not anything on the Supabase auth Session. Never gate admin-only logic on `Session.role`.
- Prefer Postgres triggers over client-side inserts for side-effect data (e.g. a reservation status change creating a notification row) — keeps that logic out of the frontend and reduces Django-migration rework.

## Checklist: adding or updating a database table

When a new table is added to Supabase, or an existing table's columns change, update these
non-component/non-hook files (in this order — each one depends on the last):

1. **`frontend/src/api/types/<resource>.types.js`** — JSDoc `@typedef` for the domain shape
   (camelCase) and its `New<Resource>` creation shape. Source of truth for what fields exist.
2. **`frontend/src/api/mappers/<resource>.mapper.js`** — `toX`/`toXs`/`toXRow` conversions
   between the new/changed snake_case columns and the camelCase typedef from step 1.
3. **`frontend/src/api/services/<resource>.service.js`** — service functions using the mapper;
   add/update whichever CRUD functions the table needs, throwing `ApiError` via
   `fromSupabaseError`. Mark any admin-only functions explicitly in their JSDoc.
4. **Supabase RLS policies** (in the Supabase dashboard/SQL migration files, not in this repo's
   `src/` tree, but treat as part of the same change) — every new table needs RLS from the start,
   scoped to the owning user or `is_admin()` as appropriate. This is not optional; see
   `CLAUDE.md`'s "RLS cautiousness" note.
5. **`docs/api.md`** — add/update:
    - the domain type in §1
    - a numbered section for the resource (or update the existing one) listing each service
      function's current Supabase behavior + future Django endpoint, admin-only labels, and any
      privacy/access-control notes
    - the quick-reference table (function → endpoint → method)
    - any new open items in the final "Open items to resolve before/during Django migration" section
6. **`CLAUDE.md`** — update the `src/api/` architecture section's list of service files if a new
   resource was added; add anything genuinely new to "Known issues" or "Conventions" if the
   change introduces a new pattern (e.g. a new trigger, a new admin-only convention).
7. **`AGENTS.md`** (this file) — only if the change alters one of the conventions listed above,
   not for routine per-table additions.

Explicitly **not** in scope for this checklist: `useX` hooks and components — those follow from
the service layer but are addressed separately since they're feature-specific, not backend-seam
files.
