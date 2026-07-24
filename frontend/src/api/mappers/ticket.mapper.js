// src/api/mappers/ticket.mapper.js

import '../types/ticket.types';

export function toTicket(row) {
  return {
    id: row.id,
    userId: row.user_id,
    subject: row.subject,
    status: row.status,
    body: row.body,
  };
}

export function toTickets(rows) {
  return (rows || []).map(toTicket);
}

export function toTicketRow(ticket) {
  return {
    user_id: ticket.userId,
    subject: ticket.subject,
    status: ticket.status,
    body: ticket.body,
  };
}
