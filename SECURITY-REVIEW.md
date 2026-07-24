# SECURITY REVIEW — 2026-07-24

This document summarizes the findings from an automated security-focused review of staged and unstaged changes.

| # | Severity | File | Lines | Vulnerability | Confidence |
|---|----------|------|-------|---------------|------------|
| 1 | 🔴 HIGH     | frontend/src/api/services/profiles.service.js | 118-137 | User resumes uploaded to a public bucket and stored as public URLs (sensitive data exposure) | 9/10 |
| 2 | 🟠 MEDIUM   | frontend/src/api/mappers/reservation.mapper.js  | 14-23  | Other users' internal userId is exposed in reservation objects returned to clients | 8/10 |
| 3 | 🟠 MEDIUM   | frontend/src/api/errors/apiError.js            | 59-62  | Raw backend error messages propagated to UI (information leakage) | 8/10 |

## Findings and suggested fixes

1) User resumes uploaded to a public bucket and stored as public URLs (frontend/src/api/services/profiles.service.js:118-137)

- Description: Uploaded resume files are made publicly accessible and a permanent public URL is stored in the profiles table, exposing PII.
- Confidence: 9/10
- Suggested minimal fix: Stop storing permanent public URLs. Store object path or use a private bucket and generate short-lived signed URLs (supabase.storage.from(...).createSignedUrl(...)) when serving files. Prefer server-side signed-URL generation.

2) Other users' internal userId is exposed in reservation objects returned to clients (frontend/src/api/mappers/reservation.mapper.js:14-23)

- Description: Mapper passes raw user_id UUIDs to the client for reservations, leaking internal identifiers.
- Confidence: 8/10
- Suggested minimal fix: Omit or null out user_id for listings returned to other users. Enforce on backend/API layer or sanitize client-side mapping as a stop-gap.

3) Raw backend error messages propagated to UI (frontend/src/api/errors/apiError.js:59-62)

- Description: Supabase/Postgres raw error messages are surfaced to users, potentially leaking internal details.
- Confidence: 8/10
- Suggested minimal fix: Replace raw error messages with a generic user-facing message and log the original error to a secure log/telemetry backend. Avoid rendering error.cause or error.message in the UI.

---

If desired, Copilot can implement any of the suggested fixes or create pull requests. For now this file records the review output.

Co-authored-by: Copilot <223556219+Copilot@users.noreply.github.com>
