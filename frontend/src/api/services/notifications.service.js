// src/api/services/notifications.service.js
//
// CONVENTION (same as reservations.service.js):
// - Only this file (and other files in src/api/) may import "../client"
//   or talk to Supabase's query builder directly.
// - Every exported function takes/returns plain domain objects (see
//   notification.types.js), never raw Supabase rows.
// - Every exported function throws ApiError, never a raw Supabase error.
// - No React/Redux imports here — this file must be callable from a
//   plain Node script or test file identically to how a hook calls it.
//
// WHEN MIGRATING TO DJANGO:
// Only the body of each function changes (swap supabase.from(...) calls
// for fetch('/api/notifications/...') calls). Function names, parameters,
// and return shapes stay identical, so nothing outside this file needs
// to change.
//
// ACCESS CONTROL NOTE:
// getNotificationsByUser/markNotificationRead/markAllNotificationsRead/
// deleteNotification are intended for the notification's OWNER only —
// access control should be enforced via Supabase Row Level Security
// (RLS) policies on the `notifications` table (e.g. select/update/delete
// restricted to rows where user_id = auth.uid()), not just by which
// functions the frontend happens to call. The same rule will need to be
// reimplemented as a Django permission check after migration.
//
// CREATION NOTE:
// Per project convention, notifications should generally be created by
// a Postgres trigger (e.g. on reservation status change, wallet credit,
// etc.) rather than a client-side insert — this keeps notification-
// creation logic out of the frontend and reduces what needs to be
// reimplemented on the Django side. createNotification() below exists
// as an ADMIN-ONLY escape hatch (e.g. an admin manually notifying a
// specific user) and should be gated behind admin-only UI/routes; it
// still relies on RLS to actually enforce that only admins can insert
// rows for a user_id other than their own, if that's ever needed.

import { supabase } from '../supabase';
import { fromSupabaseError } from '../errors/apiError';
import { toNotification, toNotifications, toNotificationRow } from '../mappers/notification.mapper';

/**
 * Fetches all notifications belonging to a specific user, most recent
 * first. Used to populate the notification panel/list.
 *
 * @param {string} userId
 * @returns {Promise<import('../types/notification.types').Notification[]>}
 */
export async function getNotificationsByUser(userId) {
  const { data, error } = await supabase
    .from('notifications')
    .select('*')
    .eq('user_id', userId)
    .order('created_at', { ascending: false });

  if (error) throw fromSupabaseError(error);

  return toNotifications(data);
}

/**
 * Marks a single notification as read (e.g. when the user opens/clicks
 * it in the notification panel).
 *
 * @param {number} notificationId
 * @returns {Promise<import('../types/notification.types').Notification>}
 */
export async function markNotificationRead(notificationId) {
  const { data, error } = await supabase
    .from('notifications')
    .update({ is_read: true })
    .eq('id', notificationId)
    .select()
    .single();

  if (error) throw fromSupabaseError(error);

  return toNotification(data);
}

/**
 * Marks every unread notification belonging to a user as read (e.g. a
 * "mark all as read" button in the notification panel).
 *
 * @param {string} userId
 * @returns {Promise<void>}
 */
export async function markAllNotificationsRead(userId) {
  const { error } = await supabase
    .from('notifications')
    .update({ is_read: true })
    .eq('user_id', userId)
    .eq('is_read', false);

  if (error) throw fromSupabaseError(error);
}

/**
 * Deletes a single notification permanently (e.g. the user dismisses it
 * from the panel). Unlike reservations (which soft-cancel to preserve
 * history), notifications have no need for a retained record once
 * dismissed, so this is a real delete.
 *
 * @param {number} notificationId
 * @returns {Promise<void>}
 */
export async function deleteNotification(notificationId) {
  const { error } = await supabase.from('notifications').delete().eq('id', notificationId);

  if (error) throw fromSupabaseError(error);
}

/**
 * Creates a notification for a specific user. ADMIN-ONLY — see the
 * creation note above. In the common case, notifications should be
 * created by a Postgres trigger instead of this function; this exists
 * for manual/admin-initiated notifications only.
 *
 * @param {import('../types/notification.types').NewNotification} notification
 * @returns {Promise<import('../types/notification.types').Notification>}
 */
export async function createNotification(notification) {
  const row = toNotificationRow(notification);

  const { data, error } = await supabase.from('notifications').insert(row).select().single();

  if (error) throw fromSupabaseError(error);

  return toNotification(data);
}
