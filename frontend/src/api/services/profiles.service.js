// src/api/services/profiles.service.js
//
// CONVENTION (same as reservations.service.js):
// - Only this file (and other files in src/api/) may import "../client"
//   or talk to Supabase's query builder directly.
// - Every exported function takes/returns plain domain objects (see
//   profile.types.js), never raw Supabase rows.
// - Every exported function throws ApiError, never a raw Supabase error.
//
// WHEN MIGRATING TO DJANGO:
// Only the body of each function changes. Names, parameters, and return
// shapes stay identical, so nothing outside this file needs to change.
//
// RELATIONSHIP TO AUTH:
// Profiles are NOT created via this service alone — a profile row can
// only exist for a user_id that already exists in auth.users. The usual
// flow is:
//   1. supabase.auth.signUp({ email, password }) — creates the auth.users
//      row and returns the new user's id
//   2. createProfile({ id: <that id>, firstName, lastName, ... }) — creates
//      the matching public.profiles row
// Step 1 lives in auth.service.js (not this file) since it's an auth
// concern, not a data concern. This file only ever touches the
// `profiles` table.

import { supabase } from '../supabase';
import { fromSupabaseError } from '../errors/apiError';
import { toProfile, toProfileRow, toProfileUpdateRow } from '../mappers/profile.mapper';

/**
 * Fetches a single profile by id (the same id as auth.users.id /
 * the current session's user).
 * Throws ApiError with code 'NOT_FOUND' if no profile matches.
 *
 * @param {string} userId - UUID
 * @returns {Promise<import('../types/profile.types').Profile>}
 */
export async function getProfileById(userId) {
  const { data, error } = await supabase.from('profiles').select('*').eq('id', userId).single();

  if (error) throw fromSupabaseError(error);

  return toProfile(data);
}

/**
 * Creates the profiles row for a user who has already been created in
 * Supabase Auth. Call this immediately after a successful sign-up, using
 * the id returned by auth.service.js's signUp function.
 *
 * @param {import('../types/profile.types').NewProfile} profile
 * @returns {Promise<import('../types/profile.types').Profile>}
 */
export async function createProfile(profile) {
  const row = toProfileRow(profile);

  const { data, error } = await supabase.from('profiles').insert(row).select().single();

  if (error) throw fromSupabaseError(error);

  return toProfile(data);
}

/**
 * Updates one or more fields on a profile. Only pass the fields you want
 * to change — anything left out of `changes` is untouched.
 *
 * Typical uses: editing contact info, changing language/level,
 * admin approving signup (signupStatus), adjusting credit balance after
 * a payment.
 *
 * @param {string} userId
 * @param {Partial<Omit<import('../types/profile.types').Profile, 'id'>>} changes
 * @param {File | null} avatarFile - Optional file object for uploading a new avatar image
 * @param {File | null} resumeFile - Optional file object for uploading a new resume file
 * @returns {Promise<import('../types/profile.types').Profile>}
 */
export async function updateProfile(userId, changes, avatarFile, resumeFile) {
  const row = toProfileUpdateRow(changes);

  //1. update other fields
  const { data: data1, error: error1 } = await supabase
    .from('profiles')
    .update(row)
    .eq('id', userId)
    .select()
    .single();

  if (error1) throw fromSupabaseError(error1);

  if (!avatarFile && !resumeFile) return toProfile(data1);

  if (avatarFile) {
    // 2. upload avatar to supabase
    const avatarFileName = `avatar-${data1.id}-${Math.floor(Math.random() * 100000)}`;

    const { error: storageError1 } = await supabase.storage
      .from('avatars')
      .upload(avatarFileName, avatarFile);

    if (storageError1) throw fromSupabaseError(storageError1);

    // 3. update avatar url

    const row = toProfileUpdateRow({
      avatarUrl: `${import.meta.env.VITE_SUPABASE_URL}/storage/v1/object/public/avatars/${avatarFileName}`,
    });

    const { data: data2, error: error2 } = await supabase
      .from('profiles')
      .update(row)
      .eq('id', userId)
      .select()
      .single();

    if (error2) throw fromSupabaseError(error2);
    if (!resumeFile) return toProfile(data2);
  }

  if (resumeFile) {
    // 4. upload resume to supabase
    const resumeFileName = `resume-${data1.id}-${Math.floor(Math.random() * 100000)}`;

    const { error: storageError2 } = await supabase.storage
      .from('resumes')
      .upload(resumeFileName, resumeFile);

    if (storageError2) throw fromSupabaseError(storageError2);

    // 5. update resume url

    const row = toProfileUpdateRow({
      resumeUrl: `${import.meta.env.VITE_SUPABASE_URL}/storage/v1/object/public/resumes/${resumeFileName}`,
    });

    const { data: data3, error: error3 } = await supabase
      .from('profiles')
      .update(row)
      .eq('id', userId)
      .select()
      .single();

    if (error3) throw fromSupabaseError(error3);

    return toProfile(data3);
  }
}

/**
 * Adjusts a user's credit balance by a positive or negative delta
 * (e.g. +500000 after a top-up, -80000 after paying for a reservation),
 * rather than the caller having to read the current balance, do the math,
 * and call updateProfile with the new total themselves.
 *
 * NOTE: this does a read-then-write, which has a race condition if two
 * balance changes happen for the same user at the exact same moment
 * (e.g. two tabs open). For a venue booking app this is low-risk, but if
 * it ever matters, this is better done as a Postgres function
 * (e.g. `increment_credit_balance(user_id, delta)`) called via
 * supabase.rpc(), which updates atomically in the database instead of
 * in two round trips from the client.
 *
 * @param {string} userId
 * @param {number} delta - positive to add credit, negative to deduct
 * @returns {Promise<import('../types/profile.types').Profile>}
 */
export async function adjustCreditBalance(userId, delta) {
  const current = await getProfileById(userId);
  const newBalance = current.creditBalance + delta;

  return updateProfile(userId, { creditBalance: newBalance });
}
