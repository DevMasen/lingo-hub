// src/api/mappers/ticket.mapper.js

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
  return {
    subject: ticket.subject,
    body: ticket.body,
    status: ticket.status,
  };
}
