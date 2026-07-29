// src/api/types/notification.types.js
//
// Domain shape for a user notification. Always targeted at a single
// user — there is no broadcast/announcement concept here (that's what
// the `news` table is for). `id` and `createdAt` are always
// server-assigned. `type` distinguishes the notification's origin/
// purpose so the UI can pick an icon/style (e.g. reservation update vs.
// wallet vs. system) without parsing `title`/`body` text.

/**
 * @typedef {Object} Notification
 * @property {number} id
 * @property {string} userId - UUID, references a Profile
 * @property {'reservation'|'wallet'|'system'} type
 * @property {boolean} isRead
 * @property {string} createdAt - ISO 8601 timestamp, e.g. "2026-06-26T17:27:05Z"
 * @property {string} title
 * @property {string} body
 */

/**
 * Shape used when creating a notification. `id`, `isRead` (defaults to
 * false), and `createdAt` are excluded/optional since the database
 * assigns them.
 *
 * @typedef {Object} NewNotification
 * @property {string} userId - UUID, references a Profile
 * @property {'reservation'|'wallet'|'system'} type
 * @property {string} [createdAt]
 * @property {string} title
 * @property {string} [body]
 */

export {};
