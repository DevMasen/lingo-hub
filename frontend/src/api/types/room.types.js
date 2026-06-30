// src/api/types/room.types.js
//
// Domain shape for a room. `status` is included as optional since you
// were deciding between room-level status vs. per-slot out_of_service
// on reservations — if you only went with the per-slot approach, this
// field will simply always be undefined/absent and can be deleted later
// with no ripple effect elsewhere.

/**
 * @typedef {Object} Room
 * @property {number} id
 * @property {string} roomName
 * @property {number} reservePricePerHalfHour - in Tomans
 * @property {'active'|'out_of_service'} [status]
 */

/**
 * Shape used when creating a new room — same fields, `id` excluded since
 * it's likely either auto-generated or manually assigned once at setup
 * time (rooms are static/rarely created, unlike reservations).
 *
 * @typedef {Omit<Room, 'id'>} NewRoom
 */

export {};
