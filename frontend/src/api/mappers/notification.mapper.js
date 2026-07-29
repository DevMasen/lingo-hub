// src/api/mappers/notification.mapper.js
//
// Converts between Supabase's raw `notifications` row (snake_case) and
// the app's domain Notification type (camelCase). See
// notification.types.js for the target shape.

/** Converts a raw Supabase row into our domain Notification type. */
export function toNotification(row) {
  return {
    id: row.id,
    userId: row.user_id,
    type: row.type,
    isRead: row.is_read,
    createdAt: row.created_at,
    title: row.title,
    body: row.body,
  };
}

/** Converts an array of raw Supabase rows. */
export function toNotifications(rows) {
  return (rows ?? []).map(toNotification);
}

/**
 * Converts our domain NewNotification shape into the raw insert payload
 * Supabase expects.
 */
export function toNotificationRow(notification) {
  return {
    user_id: notification.userId,
    type: notification.type,
    created_at: notification.createdAt,
    title: notification.title,
    body: notification.body,
  };
}
