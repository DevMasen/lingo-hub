// src/api/mappers/room.mapper.js
//
// Converts between Supabase's raw `rooms` row (snake_case) and the app's
// domain Room type (camelCase). See room.types.js for the target shape.

/** Converts a raw Supabase row into our domain Room type. */
export function toRoom(row) {
  return {
    id: row.id,
    roomName: row.room_name,
    reservePricePerHalfHour: row.reserve_price_per_half_hour,
    // Only included if your schema has this column — if you skipped the
    // room-level status approach, row.status will simply be undefined
    // and this line is harmless.
    status: row.status,
  };
}

/** Converts an array of raw Supabase rows. */
export function toRooms(rows) {
  return (rows ?? []).map(toRoom);
}

/**
 * Converts our domain Room/NewRoom shape into the raw insert/update
 * payload Supabase expects.
 */
export function toRoomRow(room) {
  return {
    room_name: room.roomName,
    reserve_price_per_half_hour: room.reservePricePerHalfHour,
    status: room.status,
  };
}
