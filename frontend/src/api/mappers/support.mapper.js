// src/api/mappers/support.mapper.js
// Placeholder mapper file. For now tickets are already camelCase. Keep the
// file so swapping to Supabase or Django later is straightforward.

export function toTicket(row) {
  return {
    id: row.id,
    subject: row.subject,
    body: row.body,
    status: row.status,
    createdAt: row.created_at || row.createdAt,
  };
}

export function toTickets(rows) {
  return (rows || []).map(toTicket);
}

export function toTicketRow(ticket) {
  // If switching to Supabase this will convert camelCase -> snake_case.
  return {
    subject: ticket.subject,
    body: ticket.body,
    status: ticket.status,
  };
}
