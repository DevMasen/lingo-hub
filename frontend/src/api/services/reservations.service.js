// src/api/services/reservations.service.js
//
// CONVENTION FOR EVERY SERVICE FILE IN THIS PROJECT:
//
// 1. Only this file (and other files in src/api/) is allowed to import
//    "../client" or talk to Supabase's query builder directly.
// 2. Every exported function:
//      - has a plain, backend-agnostic name and signature
//        (getReservationsByUser, not getReservationsFromSupabase)
//      - takes/returns plain JS objects in our domain shape (see mappers),
//        never raw Supabase response objects
//      - throws ApiError, never a raw Supabase error
//      - is async, even if a future backend implementation could be sync,
//        so calling code never needs to change
// 3. Nothing here imports React, Redux, or any UI code. This file must be
//    usable from a plain Node script, a test file, or a Redux thunk
//    identically.
//
// WHEN MIGRATING TO DJANGO:
// Only the *body* of each function changes (swap supabase.from(...) calls
// for fetch('/api/reservations/...') calls). Function names, parameters,
// and return shapes stay identical, so nothing outside this file needs
// to change.

//! Django Client
// import { ApiError } from '../errors/ApiError';

//! Supabase Client
import { supabase } from '../supabase';
import { fromSupabaseError } from '../errors/apiError';

//! mapper
import { toReservation, toReservations, toReservationRow } from '../mappers/reservation.mapper';

/**
 * Fetches all reservations for a given room on a given date.
 * Used to render the per-room, per-day time-slot grid.
 *
 * @param {number} roomId
 * @param {string} date - ISO date string, e.g. "2026-06-27"
 * @returns {Promise<import('../types/reservation.types').Reservation[]>}
 */
export async function getReservationsForRoomOnDate(roomId, date) {
  const { data, error } = await supabase
    .from('reservations')
    .select('*')
    .eq('room_id', roomId)
    .eq('reservation_date', date)
    .order('created_at', { ascending: false });

  if (error) throw fromSupabaseError(error);

  return toReservations(data);
}

/**
 * Fetches all reservations belonging to a specific user.
 *
 * @param {string} userId
 * @returns {Promise<import('../types/reservation.types').Reservation[]>}
 */
export async function getReservationsByUser(userId) {
  const { data, error } = await supabase
    .from('reservations')
    .select('*')
    .eq('user_id', userId)
    .order('reservation_date', { ascending: false });

  if (error) throw fromSupabaseError(error);

  return toReservations(data);
}

/**
 * Creates a new reservation.
 *
 * @param {Omit<import('../types/reservation.types').Reservation, 'id'>} reservation
 * @returns {Promise<import('../types/reservation.types').Reservation>}
 */
export async function createReservation(reservation) {
  const row = toReservationRow(reservation);

  const { data, error } = await supabase.from('reservations').insert(row).select().single();

  if (error) throw fromSupabaseError(error);

  return toReservation(data);
}

/**
 * Cancels a reservation by id (sets status to 'canceled', doesn't delete it —
 * matches the original app's behavior of keeping a history of cancellations).
 *
 * @param {number} reservationId
 * @returns {Promise<import('../types/reservation.types').Reservation>}
 */
export async function cancelReservation(reservationId) {
  const { data, error } = await supabase
    .from('reservations')
    .update({ status: 'canceled' })
    .eq('id', reservationId)
    .select()
    .single();

  if (error) throw fromSupabaseError(error);

  return toReservation(data);
}

/**
 * Submits a reservation by id (sets status to 'reserved').
 *
 * @param {number} reservationId
 * @returns {Promise<import('../types/reservation.types').Reservation>}
 */
export async function submitReservation(reservationId) {
  const { data, error } = await supabase
    .from('reservations')
    .update({ status: 'reserved' })
    .eq('id', reservationId)
    .select()
    .single();

  if (error) throw fromSupabaseError(error);

  return toReservation(data);
}
