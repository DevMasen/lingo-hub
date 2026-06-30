// src/api/mappers/reservation.mapper.js
//
// Converts between Supabase's raw row shape (snake_case, FK ids) and the
// app's domain shape (camelCase, nested objects where useful).
//
// This is the seam that absorbs naming differences between backends.
// Supabase gives you `room_id` and `reservation_date`; a Django/DRF
// serializer might give you `roomId` and `reservationDate` (or might not —
// you control that on the Django side). Either way, only THIS file needs
// to change to keep the rest of the app working with the same shape.

import '../types/reservation.types';

/** Converts a raw Supabase row into our domain Reservation type. */
export function toReservation(row) {
  return {
    id: row.id,
    userId: row.user_id,
    roomId: row.room_id,
    reservationDate: row.reservation_date,
    timePart: row.time_part,
    status: row.status,
  };
}

/** Converts an array of raw Supabase rows. */
export function toReservations(rows) {
  return (rows ?? []).map(toReservation);
}

/**
 * Converts our domain shape into the raw insert/update payload Supabase
 * expects. Used when WRITING data, mirrors toReservation's read direction.
 */
export function toReservationRow(reservation) {
  return {
    user_id: reservation.userId,
    room_id: reservation.roomId,
    reservation_date: reservation.reservationDate,
    time_part: reservation.timePart,
    status: reservation.status,
  };
}
