// src/api/services/tickets.service.js

import { supabase } from '../supabase';
import { fromSupabaseError } from '../errors/apiError';
import { toTicket, toTickets, toTicketRow } from '../mappers/ticket.mapper';

/**
 *
 * @param {string} userId - UUID
 * @returns {Promise<import('../types/ticket.types').Ticket[]>}
 */

export async function getUserTickets(userId) {
  const { data, error } = await supabase
    .from('tickets')
    .select('*')
    .eq('user_id', userId)
    .order('created_at', { ascending: false });

  if (error) throw fromSupabaseError(error);

  return toTickets(data);
}

/**
 *
 * @param {import('../types/ticket.types').NewTicket} ticket
 * @returns {Promise<import('../types/ticket.types').Ticket}
 */
export async function createTicket(ticket) {
  const row = toTicketRow(ticket);
  const { data, error } = await supabase.from('tickets').insert(row).select().single();

  if (error) throw fromSupabaseError(error);

  return toTicket(data);
}
