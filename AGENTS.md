# AGENTS.md

## Purpose
This file gives AI coding agents the minimal, actionable project knowledge needed to work productively in this repo.

## Key repo facts
- Frontend is a React 19 + Vite app under `frontend/`.
- Backend today is Supabase; the frontend uses a backend access layer under `frontend/src/api/`.
- No test runner is configured.

## Primary sources
- `CLAUDE.md` — architecture, conventions, and stack details.
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

## Notes for AI
- `docs/api.md` may describe a future Django REST contract; do not assume it matches the current Supabase implementation.
- Prefer updating `CLAUDE.md` or `README.md` references rather than copying large chunks of existing docs.
- If making backend or API changes, keep the current service/mappers hook boundary intact to preserve the planned Django migration seam.
