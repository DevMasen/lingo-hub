// src/api/mappers/profile.mapper.js
//
// Converts between Supabase's raw `profiles` row (snake_case) and the
// app's domain Profile type (camelCase). See profile.types.js for the
// target shape.

/** Converts a raw Supabase row into our domain Profile type. */
export function toProfile(row) {
  return {
    id: row.id,
    role: row.role,
    firstName: row.first_name,
    lastName: row.last_name,
    phoneNumber: row.phone_number,
    language: row.language,
    level: row.level,
    explanation: row.explanation,
    signupStatus: row.signup_status,
    creditBalance: row.credit_balance,
    maxReserveCount: row.max_reserve_count,
    avatarUrl: row.avatar_url,
    resumeUrl: row.resume_url,
  };
}

/** Converts an array of raw Supabase rows. */
export function toProfiles(rows) {
  return (rows ?? []).map(toProfile);
}

/**
 * Converts our domain NewProfile shape into the raw insert payload
 * Supabase expects. Used right after Supabase Auth sign-up, when
 * creating the matching profiles row.
 */
export function toProfileRow(profile) {
  return {
    id: profile.id,
    first_name: profile.firstName,
    last_name: profile.lastName,
    phone_number: profile.phoneNumber,
    language: profile.language,
    level: profile.level,
    explanation: profile.explanation,
  };
}

/**
 * Converts a partial domain Profile into a partial raw row, for use with
 * .update() calls where only some fields are being changed. Skips any
 * field that's undefined, so you can pass e.g. { creditBalance: 5000 }
 * without overwriting every other column with undefined.
 */
export function toProfileUpdateRow(partialProfile) {
  const row = {};

  if (partialProfile.firstName !== undefined) row.first_name = partialProfile.firstName;
  if (partialProfile.lastName !== undefined) row.last_name = partialProfile.lastName;
  if (partialProfile.explanation !== undefined) row.explanation = partialProfile.explanation;
  if (partialProfile.creditBalance !== undefined) row.credit_balance = partialProfile.creditBalance;
  if (partialProfile.maxReserveCount !== undefined)
    if (partialProfile.avatarUrl !== undefined) row.avatar_url = partialProfile.avatarUrl;
  if (partialProfile.resumeUrl !== undefined) row.resume_url = partialProfile.resumeUrl;

  return row;
}
