// src/api/services/ticket.types.js

/**
 * @typedef {Object} Ticket
 * @property {number} id
 * @property {string} userId
 * @property {string} subject
 * @property {string} status
 * @property {string} body
 */

/**
 *
 * @typedef {Omit<Ticket, 'id'>} NewTicket
 */

export {};
