// src/api/services/auth.service.js
//
// CONVENTION (same as other services):
// - Only this file (and other files in src/api/) may import "../client"
//   or talk to Supabase directly.
// - Every exported function takes/returns plain domain objects, never
//   raw Supabase Auth response objects.
// - Every exported function throws ApiError, never a raw Supabase error.
//
// WHY THIS FILE IS DIFFERENT FROM OTHER SERVICES:
// Every other service file (rooms, profiles, news, reservations) talks to
// a Postgres table via supabase.from(...). This file talks to Supabase's
// AUTH system instead (supabase.auth.*), which is a fundamentally
// different subsystem — it manages sessions, tokens, and the auth.users
// table that only Supabase itself can write to.
//
// WHEN MIGRATING TO DJANGO:
// This file changes MORE than the others, because Django has no
// built-in equivalent to Supabase Auth — you'll likely use Django REST
// Framework + SimpleJWT (or djoser) and roll your own OTP storage/checks,
// or a third-party auth provider. The function NAMES and SIGNATURES below
// are written to stay backend-agnostic on purpose (signUp, signIn,
// sendOtp, verifyOtp, etc.) so that callers (Redux thunks, components)
// don't change — only the internals of each function get rewritten.
//
// RELATIONSHIP TO profiles.service.js:
// Signing up only creates a row in Supabase's auth.users table — it does
// NOT create a row in our public.profiles table. signUp() below also
// calls createProfile() (from profiles.service.js) right after a
// successful sign-up, so callers get a fully set-up user in one step
// instead of having to remember to do both.
//
// FULL FEATURE LIST IN THIS FILE:
//   - signUp / signIn               (email + password)
//   - resendEmailConfirmation        (re-send the signup confirmation email)
//   - sendOtp / verifyOtp            (passwordless, email OR phone)
//   - getCurrentSession / onAuthStateChange / signOut
//   - requestPasswordReset / completePasswordReset  ("forgot password", logged OUT)
//   - changePassword                 (account settings, logged IN)

import { supabase } from '../supabase';
import { ApiError, fromSupabaseError } from '../errors/ApiError';
import { createProfile } from './profiles.service';

/**
 * @typedef {Object} Session
 * @property {string} userId
 * @property {string} [email]
 * @property {string} [phone]
 * @property {string} accessToken
 * @property {boolean} isEmailConfirmed
 */

/** Converts a raw Supabase session+user object into our domain Session type. */
function toSession(supabaseSession, supabaseUser) {
  if (!supabaseSession || !supabaseUser) return null;

  return {
    userId: supabaseUser.id,
    email: supabaseUser.email ?? undefined,
    phone: supabaseUser.phone ?? undefined,
    accessToken: supabaseSession.access_token,
    isEmailConfirmed: !!supabaseUser.email_confirmed_at,
  };
}

// ---------------------------------------------------------------------------
// SIGN UP (password-based, email)
// ---------------------------------------------------------------------------

/**
 * Signs up a new user with email + password, then creates their matching
 * profiles row. If your Supabase project has "Confirm email" enabled
 * (recommended), the returned session will be null until the user clicks
 * the confirmation link — use resendEmailConfirmation() below if they
 * need the link re-sent.
 *
 * @param {Object} params
 * @param {string} params.email
 * @param {string} params.password
 * @param {Omit<import('../types/profile.types').NewProfile, 'id'>} params.profile
 * @returns {Promise<{ session: Session | null, profile: import('../types/profile.types').Profile }>}
 */
export async function signUp({ email, password, profile }) {
  const { data, error } = await supabase.auth.signUp({ email, password });

  if (error) throw fromSupabaseError(error);

  const userId = data.user?.id;
  if (!userId) {
    throw new ApiError('Sign up did not return a user id.', { code: 'UNKNOWN' });
  }

  const createdProfile = await createProfile({ id: userId, ...profile });

  return {
    session: toSession(data.session, data.user),
    profile: createdProfile,
  };
}

/**
 * Resends the email confirmation link for a user who signed up but
 * hasn't confirmed their email yet (e.g. they didn't receive it, or the
 * link expired).
 *
 * @param {string} email
 * @returns {Promise<void>}
 */
export async function resendEmailConfirmation(email) {
  const { error } = await supabase.auth.resend({
    type: 'signup',
    email,
  });

  if (error) throw fromSupabaseError(error);
}

// ---------------------------------------------------------------------------
// SIGN IN (password-based)
// ---------------------------------------------------------------------------

/**
 * Signs in an existing user with email + password.
 * Throws ApiError with code 'UNAUTHORIZED' on wrong credentials.
 *
 * @param {string} email
 * @param {string} password
 * @returns {Promise<Session>}
 */
export async function signIn(email, password) {
  const { data, error } = await supabase.auth.signInWithPassword({ email, password });

  if (error) throw fromSupabaseError(error);

  return toSession(data.session, data.user);
}

// ---------------------------------------------------------------------------
// OTP — covers BOTH email and mobile, in two steps:
//   1. sendOtp()    — sends the 6-digit code to the given email or phone
//   2. verifyOtp()  — checks the code the user typed in and creates a session
//
// This mirrors Supabase's own two-step design (signInWithOtp + verifyOtp)
// rather than inventing four separate function names — one pair of
// functions, with `channel` telling them which contact method to use.
// ---------------------------------------------------------------------------

/**
 * Sends a one-time password to the given email or phone number. Works
 * for both sign-in (existing user) and sign-up (new user) — Supabase
 * creates the user automatically on first OTP request unless you pass
 * `createUserIfMissing: false`.
 *
 * @param {Object} params
 * @param {'email'|'phone'} params.channel
 * @param {string} params.value - the email address or phone number (E.164 format, e.g. "+989339602368")
 * @param {boolean} [params.createUserIfMissing] - defaults to true, matching Supabase's default
 * @returns {Promise<void>}
 */
export async function sendOtp({ channel, value, createUserIfMissing = true }) {
  const credentials =
    channel === 'email'
      ? { email: value, options: { shouldCreateUser: createUserIfMissing } }
      : { phone: value, options: { shouldCreateUser: createUserIfMissing } };

  const { error } = await supabase.auth.signInWithOtp(credentials);

  if (error) throw fromSupabaseError(error);
}

/**
 * Verifies a one-time password sent via sendOtp() and, if correct,
 * establishes a session.
 *
 * @param {Object} params
 * @param {'email'|'phone'} params.channel
 * @param {string} params.value - the SAME email or phone passed to sendOtp()
 * @param {string} params.code - the 6-digit code the user typed in
 * @returns {Promise<Session>}
 */
export async function verifyOtp({ channel, value, code }) {
  const credentials =
    channel === 'email'
      ? { email: value, token: code, type: 'email' }
      : { phone: value, token: code, type: 'sms' };

  const { data, error } = await supabase.auth.verifyOtp(credentials);

  if (error) throw fromSupabaseError(error);

  return toSession(data.session, data.user);
}

// ---------------------------------------------------------------------------
// SESSION MANAGEMENT
// ---------------------------------------------------------------------------

/**
 * Returns the current session if one exists (e.g. on app load, to check
 * whether the user is already logged in), or null if not.
 *
 * @returns {Promise<Session | null>}
 */
export async function getCurrentSession() {
  const { data, error } = await supabase.auth.getSession();

  if (error) throw fromSupabaseError(error);

  if (!data.session) return null;

  return toSession(data.session, data.session.user);
}

/**
 * Subscribes to auth state changes (login, logout, token refresh).
 * Returns an unsubscribe function — call it in a useEffect cleanup to
 * avoid leaking the listener.
 *
 * @param {(session: Session | null) => void} callback
 * @returns {() => void} unsubscribe function
 */
export function onAuthStateChange(callback) {
  const { data } = supabase.auth.onAuthStateChange((_event, supabaseSession) => {
    callback(toSession(supabaseSession, supabaseSession?.user));
  });

  return () => data.subscription.unsubscribe();
}

/**
 * Signs the current user out, clearing their session.
 *
 * @returns {Promise<void>}
 */
export async function signOut() {
  const { error } = await supabase.auth.signOut();

  if (error) throw fromSupabaseError(error);
}

// ---------------------------------------------------------------------------
// PASSWORD RECOVERY ("forgot password" — user is NOT logged in)
//
// This is a two-step flow, split across two functions because there's a
// real gap in time between them (the user has to go check their email):
//   1. requestPasswordReset(email) — sends a reset link to the user's email
//   2. completePasswordReset(newPassword) — called AFTER the user clicks
//      the link and lands back in your app, to actually set the new password
//
// Supabase exchanges the link's token for a temporary session automatically
// when the user lands back on your app (a PASSWORD_RECOVERY event fires via
// onAuthStateChange — see that function above). completePasswordReset()
// relies on that temporary session already being active, which is why it
// takes no token/email parameter itself — supabase.auth.updateUser() acts
// on whichever session is currently active in the browser.
// ---------------------------------------------------------------------------

/**
 * Sends a password reset link to the given email. The user is NOT logged
 * in at this point — this is the "Forgot your password?" entry point.
 *
 * @param {string} email
 * @param {Object} [options]
 * @param {string} [options.redirectTo] - URL to send the user to after clicking the email link (e.g. your app's "/reset-password" page)
 * @returns {Promise<void>}
 */
export async function requestPasswordReset(email, { redirectTo } = {}) {
  const { error } = await supabase.auth.resetPasswordForEmail(email, {
    redirectTo,
  });

  if (error) throw fromSupabaseError(error);
}

/**
 * Completes a password reset, after the user has clicked the link from
 * requestPasswordReset() and landed back in your app. Call this from your
 * "/reset-password" page once the user submits their new password.
 *
 * Relies on the temporary recovery session Supabase establishes
 * automatically when the link is clicked — listen for the
 * 'PASSWORD_RECOVERY' event via onAuthStateChange() if you need to detect
 * "the user is in the middle of a recovery flow" to show the right form.
 *
 * @param {string} newPassword
 * @returns {Promise<Session>}
 */
export async function completePasswordReset(newPassword) {
  const { data, error } = await supabase.auth.updateUser({ password: newPassword });

  if (error) throw fromSupabaseError(error);

  return toSession(data.session, data.user);
}

// ---------------------------------------------------------------------------
// PASSWORD CHANGE (user IS already logged in, e.g. from an account
// settings page — different from recovery, no email round-trip needed)
// ---------------------------------------------------------------------------

/**
 * Changes the password for the currently logged-in user. Use this for an
 * "Account Settings → Change Password" form — NOT for "forgot password"
 * (use requestPasswordReset/completePasswordReset for that instead).
 *
 * @param {Object} params
 * @param {string} params.newPassword
 * @param {string} [params.currentPassword] - required by Supabase if your project has "secure password change" enabled; omit if not
 * @returns {Promise<Session>}
 */
export async function changePassword({ newPassword, currentPassword }) {
  const payload = { password: newPassword };
  if (currentPassword !== undefined) {
    payload.currentPassword = currentPassword;
  }

  const { data, error } = await supabase.auth.updateUser(payload);

  if (error) throw fromSupabaseError(error);

  return toSession(data.session, data.user);
}
