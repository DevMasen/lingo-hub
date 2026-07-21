// src/api/services/support.service.js
// Placeholder support service. Follow project convention: one service per resource
// Exported functions return camelCase domain objects and throw ApiError on real errors.

/**
 * Returns a Promise resolving to an array of ticket objects.
 * In the real implementation this will query Supabase; for now it returns
 * static placeholder data to let the UI be built.
 */
export async function getTickets() {
  // Placeholder data
  const tickets = [
    { id: 1001, subject: 'ورود به حساب کاربری', status: 'open', createdAt: '2026-07-20T12:00:00Z' },
    { id: 1002, subject: 'پرداخت ناموفق', status: 'closed', createdAt: '2026-07-19T09:30:00Z' },
    { id: 1003, subject: 'درخواست حذف حساب', status: 'pending', createdAt: '2026-07-18T15:10:00Z' },
  ];

  return Promise.resolve(tickets);
}

/**
 * Creates a new ticket. For now it simulates creation and returns the created ticket.
 * Real implementation will insert into Supabase and return the created row.
 *
 * @param {{ subject: string, body: string }} payload
 */
export async function createTicket(payload) {
  const created = {
    id: Date.now(),
    subject: payload.subject,
    body: payload.body,
    status: 'open',
    createdAt: new Date().toISOString(),
  };

  return Promise.resolve(created);
}
