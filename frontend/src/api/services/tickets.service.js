// src/api/services/tickets.service.js

export async function getTickets() {
  const tickets = [
    { id: 1001, subject: 'ورود به حساب کاربری', status: 'open', createdAt: '2026-07-20T12:00:00Z' },
    { id: 1002, subject: 'پرداخت ناموفق', status: 'closed', createdAt: '2026-07-19T09:30:00Z' },
    { id: 1003, subject: 'درخواست حذف حساب', status: 'pending', createdAt: '2026-07-18T15:10:00Z' },
  ];

  return Promise.resolve(tickets);
}

/**
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
