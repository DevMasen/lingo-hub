// src/api/types/reservation.types.js
//
// This file declares the single shape that "Reservation" means everywhere
// in the app — components, Redux state, service functions, mappers.
//
// It is NOT executable logic. In plain JS, JSDoc typedefs like this don't
// get enforced by the language itself, but they:
//   1. give you editor autocomplete/hover-docs in VS Code for free
//   2. act as the one place to look up "what fields does a Reservation have"
//   3. become the literal source other mapper/service files reference via
//      `@param {Reservation}` / `@returns {Promise<Reservation>}` comments
//
// If you later adopt TypeScript, this file becomes reservation.types.ts
// and these typedefs become real `interface`/`type` declarations that the
// compiler actively checks — at that point this stops being documentation
// and starts being enforcement.

/**
 * @typedef {Object} Reservation
 * @property {number} id
 * @property {string} userId - UUID, references a Profile
 * @property {number} roomId - references a Room
 * @property {string} reservationDate - ISO date string, e.g. "2026-06-27"
 * @property {number} timePart - integer 0-9, half-hour slot index within the day
 * @property {'reserved'|'canceled'|'waiting'|'out_of_service'} status
 */

/**
 * Shape used when creating a new reservation — same as Reservation but
 * without `id`, since the backend assigns that.
 *
 * @typedef {Omit<Reservation, 'id'>} NewReservation
 */

// Exporting an empty object so this file can still be `import`-ed without
// errors in tooling that expects a module to have a runtime value. The
// typedefs above are what actually matter; this line is a formality.
export {};
