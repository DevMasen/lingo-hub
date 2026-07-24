# Copilot Instructions for Lingo Hub

Lingo Hub is a Persian-language academy room reservation system built with React 19 + Vite, Supabase, and designed for RTL (right-to-left) UI and Persian localization.

## Build, Test, and Lint Commands

All commands run from the `frontend/` directory:

```bash
cd frontend
npm run dev       # Start Vite dev server (http://localhost:5173)
npm run build     # Build for production
npm run lint      # Run ESLint on all files
npm run preview   # Preview production build locally
```

- **No test runner is configured yet** — focus on manual testing and E2E validation for now.
- **ESLint config**: `eslint-config-react-app` (ESLint 8 style), with Prettier integration (`prettier-plugin-tailwindcss`).

## High-Level Architecture

### Frontend Structure (React 19 + Vite)

- **`src/api/`** — Backend access layer (Supabase today, planned Django migration later). This is the critical seam for backend independence:
  - `services/*.service.js` — **Only** place Supabase is imported. One file per resource: `auth`, `rooms`, `reservations`, `profiles`, `news`.
  - `mappers/*.mapper.js` — Converts snake_case Supabase rows ↔ camelCase domain objects (`toX`, `toXs`, `toXRow`).
  - `types/*.types.js` — JSDoc `@typedef` documentation for domain shapes (Room, Reservation, Profile, NewsItem).
  - `errors/apiError.js` — Centralized API error handling.

- **`src/features/<domain>/`** — Feature-based modules (authentication, reserve, wallet, setting, header, sidebar, dashboard).
  - Each feature bundles React Query hooks (`useX`), components, and optional Context.
  - Every data fetch wraps a service call in React Query (`useQuery`/`useMutation`) with `useError` for auto-toast on failure.

- **`src/ui/`** — Reusable building blocks (Modal, Skeleton, Spinner, PanelButton, HomeButton) — domain-agnostic.

- **`src/utils/`** — Utility functions:
  - `mapToPersian.js`, `toEnglishDigits.js` — Digit conversion (Latin ↔ Persian/Arabic-Indic).
  - `makeNumericInput.js` — Sanitizes numeric input, converts to Persian digits.
  - `mapTime.js`, `timeParts.js` — Maps time slot indices (0–9, half-hour slots) to `{ startTime, stopTime }`.
  - `toPersianDate.js` — Gregorian → Persian calendar via `Intl.DateTimeFormat`.
  - `mapToPersianMonth.js` — Persian month names (expects Persian digits).
  - `getErrorMessage.js` — Normalizes errors into user-friendly Farsi messages.

- **`src/context/`** — App-level Context (DarkModeContext for theme toggle, persisted via `useLocalStorageState`).

- **Routing**: React Router v7, declarative `<Routes>` in `App.jsx`. Protected routes use `ProtectedRoute` with real auth state via `useSession`. Pages are lazy-loaded via `React.lazy` + `Suspense`.

- **Styling**: Tailwind CSS 3 + custom CSS properties in `src/index.css`:
  - `--color-slate-*` values invert between `:root` (default) and `.light-mode`.
  - Constant colors (yellow/green/indigo) are NOT theme-sensitive — use raw hex values.
  - RTL support built into Tailwind config.

- **Forms**: `react-hook-form` for reactive form state. Use with Persian digit conversion (`makeNumericInput`) for numeric inputs.

- **UI Notifications**: `react-hot-toast` for transient messages. Auto-triggered by `useError` on query failures.

### Data Flow

1. Component calls `useX` hook (e.g., `useReservations`).
2. Hook wraps `src/api/services/*.service.js` with React Query (`useQuery`/`useMutation`).
3. Service calls `supabase.from(...)` and returns plain camelCase domain objects.
4. Mapper (`src/api/mappers/*.mapper.js`) converts Supabase rows → domain objects on the way in.
5. Component receives camelCase data, renders, or displays toast on error (via `useError`).

### Backend: Supabase (Current) → Django (Planned)

- Supabase provides Postgres + Auth + Storage today.
- Service layer is intentionally backend-agnostic: function bodies swap from `supabase.from(...)` to `fetch('/api/...')` on migration.
- Mappers may need field-name tweaks but component/hook code should remain unchanged.

### Theming & Localization

- **Light/dark mode**: Toggled by `DarkModeContext`, persisted in localStorage. `index.html` starts with `class="light-mode"`.
- **Persian UI**: All user-facing text is in Farsi. Numbers displayed via `num2persian` library (`en2fa`, `moneyFormat`, `fa2en`).
- **RTL layout**: Tailwind config supports RTL. Use directional utilities (`ml` → `mr`, etc.) responsibly or use CSS logical properties.
- **Dates**: `date-fns` for logic, `persian-date` for formatting (`toPersianDate` utility).

## Key Conventions

### Service Layer (`src/api/services/*.service.js`)

- **Isolation rule**: Only these files may import `supabase` or call `.from(...)`. Never call Supabase from components or hooks.
- **Naming**: Use backend-agnostic names (`getReservationsByUser`, not `getFromSupabaseReservations`).
- **Returns**: Plain camelCase domain objects, never raw Supabase rows.
- **Errors**: Throw `ApiError`, never raw Supabase errors.
- **Async always**: Make all functions `async` even where technically unnecessary — callers should never need to change post-migration.

### Mappers (`src/api/mappers/*.mapper.js`)

- Convert snake_case Supabase rows → camelCase domain objects (`toX`, `toXs`).
- Convert camelCase domain objects → snake_case for Supabase insert/update (`toXRow`).
- **Only place** field-name mappings should live. Mappers are the primary touchpoint for a backend swap.

### Hooks & React Query

- Wrap every service call in a `useX` hook at the feature level.
- Use `useQuery` for reads, `useMutation` for writes.
- On mutation success: toast + `invalidateQueries` to refetch dependent queries.
- On error: let `useError` (imported from `src/hooks/useError.js`) auto-toast the normalized error.
- Example: `useReservations`, `useCreateReservation`, `useCancelReservation`, `useSubmitReservation`.

### Component Organization

Use comment sections to organize component internals (especially in larger/stateful components):

```javascript
//! Context
// App-level context hooks

//! React Query
// useX hooks and data management

//! Handlers
// Event handlers and form submission

//! Conditional JSX
// Fragments, early returns for loading/error states

//! Main JSX
// Final render
```

### Theming & Colors

- **Theme-adaptive**: Use `var(--color-slate-*)` for colors that invert between light/dark modes (e.g., text, borders).
- **Constant**: Use raw hex for accent colors (yellow `#FFD700`, green `#10B981`, indigo `#6366F1`) — these do **not** change with theme.
- When adding new colors, keep the split: add slate variants to `:root` + `.light-mode` blocks if it should adapt; add raw hex if it's constant.

### Persian Localization & Formatting

- **Reuse existing utilities** in `src/utils/`:
  - Persian digits: `mapToPersian(number)`, `toEnglishDigits(string)`.
  - Numeric input: `makeNumericInput(value, maxLength)` sanitizes and converts to Persian.
  - Dates: `toPersianDate(dateObj)` for display.
  - Display: `num2persian` library (`en2fa`, `moneyFormat`, `fa2en`).
- Never re-implement digit conversion or date formatting — reuse existing helpers.

### Form Handling

- Use `react-hook-form` for form state.
- For numeric inputs, wrap with `makeNumericInput` to convert typed value to Persian digits.
- Pass form errors through `react-hot-toast` after normalization via `getErrorMessage`.

### Compound Components

Modal and menu components use the compound-component pattern (context-driven state):

```javascript
<Modal.Open opens="confirmReserve">
  <button>Open</button>
</Modal.Open>
<Modal.Window name="confirmReserve">
  <ReserveConfirmation />
</Modal.Window>
```

The reservation booking flow (`ReserveRoom` → `ReserveTableRow` → `ReserveTableData` → `Modal.Open` → `ConfirmReserve`) is the canonical example.

## Important Architectural Notes

- **No test runner**: Manual testing and browser validation are expected. If you add tests, configure the runner (Jest, Vitest, etc.) first.
- **`docs/api.md`** describes a future Django REST contract — it does **not** match the current Supabase implementation. Don't assume endpoints exist.
- **Protected routes**: `ProtectedRoute` reads auth state via `useSession`. Verify it's not hardcoded/broken before assuming auth is fully wired.
- **Unused React Query**: React Query is declared and `QueryClientProvider` wraps the app, but some data fetches may still be direct Supabase calls or `useState` — check before assuming a hook exists.
- **Time slots**: Reservations use `timePart` (0–9) to represent half-hour slots. `mapTime(timePart)` converts to `{ startTime, stopTime }` strings for display.

## Backend (Planned: Python/Django)

- When migrating, only service function *bodies* change — swap `supabase.from(...)` for `fetch('/api/...')`.
- Mappers may need field-name tweaks.
- Hooks, components, and routing should remain unchanged.
- Preserve the `src/api/services` → `mappers` → `hooks` → `components` boundary to minimize refactor scope.

## Environment Setup

Create `frontend/.env.local`:

```env
VITE_SUPABASE_URL=<your_supabase_url>
VITE_SUPABASE_ANON_KEY=<your_supabase_anon_key>
```

Run `npm install` in `frontend/` before starting development.

## Git Workflow

- Use local branches for normal work: `git switch -c <branch-name>`.
- Create a Git worktree only if explicitly requested for isolated parallel work.
- Update `CLAUDE.md` or `README.md` instead of creating new docs when possible.
