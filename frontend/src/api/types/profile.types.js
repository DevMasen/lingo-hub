// src/api/types/profile.types.js
//
// Domain shape for a user profile. Note: `email` is intentionally absent
// here — it lives on Supabase's auth.users record, not on our public
// profiles table, so it's accessed via the auth/session, not this type.
// If your Django migration keeps a custom user model with email on it
// directly, you can add `email` here at that point without breaking
// anything that doesn't reference it yet.

/**
 * @typedef {Object} Profile
 * @property {string} id - UUID, matches auth.users.id
 * @property {string} firstName
 * @property {string} lastName
 * @property {string} phoneNumber
 * @property {string} language
 * @property {string} level
 * @property {string} explanation
 * @property {'confirmed'|'pending'|'rejected'} signupStatus
 * @property {number} creditBalance - in Tomans, never negative
 * @property {number} maxReserveCount
 * @property {string} avatarUrl
 * @property {string} resumeUrl
 */

/**
 * Shape used when creating a profile row right after Supabase Auth
 * sign-up. `id` is included here (unlike most "New" types) because it
 * must match the id Supabase Auth already generated for this user —
 * it's not auto-assigned by the profiles table itself.
 *
 * @typedef {Object} NewProfile
 * @property {string} id
 * @property {string} firstName
 * @property {string} lastName
 * @property {string} phoneNumber
 * @property {string} [language]
 * @property {string} [level]
 * @property {string} [explanation]
 * @property {'confirmed'|'pending'|'rejected'} [signupStatus]
 * @property {number} [creditBalance]
 * @property {number} [maxReserveCount]
 * @property {string} [avatarUrl]
 * @property {string} [resumeUrl]
 */

export {};
