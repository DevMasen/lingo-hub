# CLAUDE.md — LingoHub (لینگوهاب)

Persian-language academy room reservation system. RTL, Farsi UI.

## Stack

- **Frontend:** React 19 + Vite, React Router v7, Tailwind CSS 3, React Query v5 (`@tanstack/react-query`), styled-components (only for a couple of spinners), react-hook-form, react-hot-toast, `num2persian` / `persian-date` for Farsi number/date formatting.
- **Backend (current):** Supabase (Postgres + Auth + Storage). All access goes through `src/api/*`.
- **Backend (planned):** Migration to Python/Django — the `src/api` layer is deliberately structured as a seam for this (see below).
- **Lint/format:** ESLint (`eslint-config-react-app`, still on ESLint 8 config style) + Prettier w/ `prettier-plugin-tailwindcss`.

## Commands

```bash
cd frontend
npm run dev       # vite dev server
npm run build     # vite build
npm run lint      # eslint .
npm run preview   # preview prod build
```

No test runner is configured yet.

## Architecture

### `src/api/` — backend access layer (Supabase today, Django later)

This is the most important architectural convention in the repo:

- `src/api/supabase.js` — Supabase client, reads `VITE_SUPABASE_URL` / `VITE_SUPABASE_ANON_KEY` from env.
- `src/api/services/*.service.js` — **only** files allowed to import the Supabase client or call `.from(...)`. One file per resource: `auth.service.js`, `rooms.service.js`, `reservations.service.js`, `profiles.service.js`, `news.service.js`, `tickets.service.js`, `notifications.service.js`. Every exported function:
    - has a backend-agnostic name/signature (`getReservationsByUser`, not `...FromSupabase`)
    - takes/returns plain camelCase domain objects, never raw Supabase rows
    - throws `ApiError` (`src/api/errors/apiError.js`), never a raw Supabase error
    - is `async` even where it needn't be, so callers never change post-migration
- `src/api/mappers/*.mapper.js` — snake_case Supabase row ⇄ camelCase domain object conversion (`toX`, `toXs`, `toXRow`). This is the _only_ place that should need to change when swapping backends.
- `src/api/types/*.types.js` — JSDoc `@typedef`s documenting each domain shape (Room, Reservation, Profile, NewsItem, Ticket, Notification). Non-executable; would become real `.ts` interfaces if the project ever adopts TypeScript.

**When migrating to Django:** only the _bodies_ of service functions change (swap `supabase.from(...)` for `fetch('/api/...')`); mappers may need field-name tweaks; everything above (hooks, components) should not need to change.

### Admin access

App-level admin status lives on `profiles.role` (`'user' | 'admin'`), **not** on the Supabase auth
session role (`Session.role`, which is `'authenticated' | 'anon'` and only reflects login state).
Any admin-only service function (`updateRoom`, `createRoom`, `createNewsItem`/`updateNewsItem`/`deleteNewsItem`,
`createNotification`, etc.) relies on this distinction and is documented as admin-only in `docs/api.md`.
Currently enforced via Supabase RLS (`is_admin()` SECURITY DEFINER helper); must become explicit
Django permission classes post-migration — see `docs/api.md` §7/§8 for the specific functions and
their access-control notes.

### Data-fetching pattern

Every resource has a `useX` hook in its feature folder wrapping React Query (`useQuery`/`useMutation`) around the matching service function, plus `useError` (`src/hooks/useError.js`) to toast any query error automatically. Mutations follow a consistent `onSuccess` (toast + `invalidateQueries`) / `onError` (console.error + toast) shape. Look at `useRooms`, `useReservations`, `useCreateReservation`, `useCancelReservation`, `useSubmitReservation` for the template.

⚠️ React Query is a declared dependency and `QueryClientProvider` wraps the app, but per project memory it was recently _unused_ in places — check before assuming every data need already has a hook.

### Feature folder layout

`src/features/<domain>/` groups components + hooks + (sometimes) Context for one domain: `authentication`, `reserve`, `wallet`, `setting`, `header`, `sidebar`, `dashboard`, `support`. `src/ui/` holds generic, domain-agnostic building blocks (`Modal`, `Skeleton`, `Spinner`, `PanelButton`, `HomeButton`, etc.).

The notification panel (`UserNotifications.jsx`) lives in `src/features/header/` alongside its
existing sibling `HeaderContext` (which already tracks `isNotificationOpen`/`toggleNotification` —
no new context is needed for notifications).

### Compound components

`Modal` (`src/ui/Modal.jsx`) and `UserParameter` / `Menus` use the compound-component pattern (`Modal.Open`, `Modal.Window`, context-driven open/close state). Reservation booking flow (`ReserveRoom` → `ReserveTableRow` → `ReserveTableData` → `Modal.Open` → `ConfirmReserve`) is the canonical example.

### Theming

CSS custom properties in `src/index.css`, scoped under `:root`, with a slate-scale-inversion technique: `--color-slate-*` values are inverted between the default block and `&.light-mode`. `index.html`'s `<html>` currently hardcodes `class="light-mode"`; `DarkModeContext` (`src/context/DarkModeContext.jsx`) toggles `dark-mode`/`light-mode` classes on `document.documentElement` and persists via `useLocalStorageState`. Constant colors (yellow/green/indigo) are NOT theme-sensitive and live outside the light/dark blocks — keep that split when adding new colors.

### Routing

`react-router` v7, declarative `<Routes>` in `App.jsx`. Protected routes wrapped in `ProtectedRoute` (currently reads real auth state via `useSession`, per project memory this was previously hardcoded/broken — verify current state before assuming it's fixed). Lazy-loaded pages via `React.lazy` + `Suspense`.

### Localization / number formatting utilities (`src/utils/`)

- `mapToPersian.js` / `toEnglishDigits.js` — digit conversion between Latin/Persian/Arabic-Indic numerals.
- `makeNumericInput.js` — sanitizes free-text numeric input, converting to Persian digits.
- `mapTime.js` — maps a `timePart` integer (0–9, half-hour slot index) to `{ startTime, stopTime }` strings. `timeParts.js` exports `[0..9]`.
- `toPersianDate.js` — Gregorian → Persian calendar date string via `Intl.DateTimeFormat`.
- `mapToPersianMonth.js` — Persian month-number digit string → month name (expects Persian digits, e.g. `'۰۱'`).
- `getErrorMessage.js` — normalizes any thrown value into a displayable Farsi-friendly message.

Most user-facing quantities go through `num2persian` (`en2fa`, `moneyFormat`, `fa2en`) for Persian numeral display.

## Known issues (from prior audit — verify against current `dev` branch before relying on this)

- `ReserveTableData` and reservation flow rely on a `timePart` (0–9) integer as the half-hour slot key.
- `ReservePrice.jsx` currently hardcodes a `0` price instead of using `reservePricePerHalfHour` — likely still needs the calculation fix.
- Email regex in signup/login forms (`SignupForm.jsx`, `LoginEmail.jsx`) uses `/\S+@\S+\.\S+/` (no `g` flag misuse currently visible in these excerpts, but re-verify project-wide).
- `json-server` in prod dependencies and client-side OTP generation were flagged in a prior audit — not present in the current `package.json` snapshot, so may already be fixed on `dev`.
- `docs/api.md` describes a REST contract (`/auth/otp/send`, `/rooms`, `/reservations`, etc.) that does **not** match the current Supabase-direct implementation in `src/api/services/*` — likely a forward-looking spec for the Django migration, not the current API shape. Don't assume it's implemented today.
- Room availability privacy: `GET /rooms` in `docs/api.md` returns other users' `userId` per slot — confirm the equivalent Supabase query (`reservations` table `select`) doesn't leak `user_id` for other users' rows to the client beyond what's needed to render "taken" vs "available."
- Notification-producing triggers (reservation status change, wallet credit, etc.) are not yet documented anywhere — see `docs/api.md` §10 open item. Document each trigger's source event → resulting notification shape as it's added, since triggers have no service-layer representation to read from.

## Conventions to follow when adding code

- New Supabase calls go in `src/api/services/*.service.js` only — never call `supabase.from(...)` from a component or hook directly.
- Add a matching mapper (`toX`/`toXRow`) rather than passing snake_case around.
- Wrap new data needs in a `useX` hook using React Query + `useError`.
- Use `var(--color-slate-*)` etc. for anything that should adapt to light/dark mode; use the raw hex constants (yellow/green/indigo) for things that shouldn't.
- Persian digit/date formatting: reuse the existing `utils/` helpers rather than reimplementing.
- Comments in service files (`//! Section`) are a repo-wide convention for organizing component internals (`//! Context`, `//! React Query`, `//! Handlers`, `//! Conditional JSX`, `//! Main JSX`) — follow this ordering in new components for consistency.
- Prefer DB triggers over client-side inserts for side-effect data (e.g. notifications created as a result of a reservation/wallet change) — see `notifications.service.js`'s file header for the reasoning; it eases the Django migration by keeping side-effect logic out of the frontend.
- Any admin-only service function must be labeled as such in its JSDoc and in `docs/api.md` — don't rely on the function name alone to signal that.

## Adding or changing a database table — file checklist

See `AGENTS.md` for the canonical, up-to-date checklist of non-component/non-hook files to touch.
