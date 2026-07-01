// src/api/services/rooms.service.js
//
// CONVENTION (same as reservations.service.js):
// - Only this file (and other files in src/api/) may import "../client"
//   or talk to Supabase's query builder directly.
// - Every exported function takes/returns plain domain objects (see
//   room.types.js), never raw Supabase rows.
// - Every exported function throws ApiError, never a raw Supabase error.
// - No React/Redux imports here — this file must be callable from a
//   plain Node script or test file identically to how a thunk calls it.
//
// WHEN MIGRATING TO DJANGO:
// Only the body of each function changes (swap supabase.from(...) for
// fetch('/api/rooms/...')). Names, parameters, and return shapes stay
// identical, so nothing outside this file needs to change.
//
// USAGE NOTES:
// Rooms are mostly static reference data — they don't change often, so
// callers (e.g. Redux) may choose to cache the result of getAllRooms()
// for the lifetime of a session rather than refetching on every render.
// That caching decision belongs in the Redux layer, not here.

import { supabase } from '../supabase';
import { fromSupabaseError } from '../errors/apiError';
import { toRoom, toRooms, toRoomRow } from '../mappers/room.mapper';

/**
 * Fetches every room, ordered by room name.
 * Used to populate the room list/grid on the booking page.
 *
 * @returns {Promise<import('../types/room.types').Room[]>}
 */
export async function getAllRooms() {
  const { data, error } = await supabase
    .from('rooms')
    .select('*')
    .order('room_name', { ascending: true });

  if (error) throw fromSupabaseError(error);

  return toRooms(data);
}

/**
 * Fetches a single room by id.
 * Throws ApiError with code 'NOT_FOUND' if no room matches.
 *
 * @param {number} roomId
 * @returns {Promise<import('../types/room.types').Room>}
 */
export async function getRoomById(roomId) {
  const { data, error } = await supabase.from('rooms').select('*').eq('id', roomId).single();

  if (error) throw fromSupabaseError(error);

  return toRoom(data);
}

/**
 * Updates a room's price and/or status. Intended for admin use (e.g. an
 * admin dashboard adjusting prices or marking a room out of service at
 * the whole-room level).
 *
 * Only pass the fields you want to change — fields left out of `changes`
 * are left untouched on the row.
 *
 * @param {number} roomId
 * @param {Partial<Pick<import('../types/room.types').Room, 'reservePricePerHalfHour' | 'status'>>} changes
 * @returns {Promise<import('../types/room.types').Room>}
 */
export async function updateRoom(roomId, changes) {
  const row = {};
  if (changes.reservePricePerHalfHour !== undefined) {
    row.reserve_price_per_half_hour = changes.reservePricePerHalfHour;
  }
  if (changes.status !== undefined) {
    row.status = changes.status;
  }

  const { data, error } = await supabase
    .from('rooms')
    .update(row)
    .eq('id', roomId)
    .select()
    .single();

  if (error) throw fromSupabaseError(error);

  return toRoom(data);
}

/**
 * Creates a new room. Intended for admin use only (adding a physical
 * room to the venue is rare, not a regular user action).
 *
 * @param {import('../types/room.types').NewRoom} room
 * @returns {Promise<import('../types/room.types').Room>}
 */
export async function createRoom(room) {
  const row = toRoomRow(room);

  const { data, error } = await supabase.from('rooms').insert(row).select().single();

  if (error) throw fromSupabaseError(error);

  return toRoom(data);
}
