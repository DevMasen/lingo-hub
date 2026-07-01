// src/api/services/news.service.js
//
// CONVENTION (same as reservations.service.js):
// - Only this file (and other files in src/api/) may import "../client"
//   or talk to Supabase's query builder directly.
// - Every exported function takes/returns plain domain objects (see
//   news.types.js), never raw Supabase rows.
// - Every exported function throws ApiError, never a raw Supabase error.
//
// WHEN MIGRATING TO DJANGO:
// Only the body of each function changes. Names, parameters, and return
// shapes stay identical, so nothing outside this file needs to change.
//
// ACCESS CONTROL NOTE:
// getLatestNews/getNewsById are intended for all users (read-only feed).
// createNewsItem/updateNewsItem/deleteNewsItem are intended for admin use
// only — this file does not enforce that itself; access control should
// be handled via Supabase Row Level Security (RLS) policies on the
// `news` table (e.g. insert/update/delete restricted to a specific role
// or a specific admin user id), not just by which functions the frontend
// happens to call. The same RLS rule will need to be reimplemented as a
// Django permission check after migration.

import { supabase } from '../supabase';
import { fromSupabaseError } from '../errors/apiError';
import { toNewsItem, toNewsItems, toNewsRow } from '../mappers/news.mapper';

/**
 * Fetches news items, most recent first, optionally limited to a
 * specific count (for a "latest N news" feed/widget).
 *
 * @param {number} [limit] - max number of items to return; omit for all
 * @returns {Promise<import('../types/news.types').NewsItem[]>}
 */
export async function getLatestNews(limit) {
  let query = supabase.from('news').select('*').order('published_at', { ascending: false });

  if (limit !== undefined) {
    query = query.limit(limit);
  }

  const { data, error } = await query;

  if (error) throw fromSupabaseError(error);

  return toNewsItems(data);
}

/**
 * Fetches a single news item by id (e.g. for a "read full article" page).
 * Throws ApiError with code 'NOT_FOUND' if no item matches.
 *
 * @param {number} newsId
 * @returns {Promise<import('../types/news.types').NewsItem>}
 */
export async function getNewsById(newsId) {
  const { data, error } = await supabase.from('news').select('*').eq('id', newsId).single();

  if (error) throw fromSupabaseError(error);

  return toNewsItem(data);
}

/**
 * Creates a new news item. Admin-only — see access control note above.
 *
 * @param {import('../types/news.types').NewNewsItem} newsItem
 * @returns {Promise<import('../types/news.types').NewsItem>}
 */
export async function createNewsItem(newsItem) {
  const row = toNewsRow(newsItem);

  const { data, error } = await supabase.from('news').insert(row).select().single();

  if (error) throw fromSupabaseError(error);

  return toNewsItem(data);
}

/**
 * Updates an existing news item's label and/or body. Admin-only — see
 * access control note above.
 *
 * @param {number} newsId
 * @param {Partial<Pick<import('../types/news.types').NewsItem, 'label' | 'body'>>} changes
 * @returns {Promise<import('../types/news.types').NewsItem>}
 */
export async function updateNewsItem(newsId, changes) {
  const row = {};
  if (changes.label !== undefined) row.label = changes.label;
  if (changes.body !== undefined) row.body = changes.body;

  const { data, error } = await supabase
    .from('news')
    .update(row)
    .eq('id', newsId)
    .select()
    .single();

  if (error) throw fromSupabaseError(error);

  return toNewsItem(data);
}

/**
 * Deletes a news item permanently. Admin-only — see access control note
 * above. Unlike reservations.service.js's cancelReservation (which keeps
 * a soft-canceled record for history), news items have no need for a
 * retained history once removed, so this is a real delete.
 *
 * @param {number} newsId
 * @returns {Promise<void>}
 */
export async function deleteNewsItem(newsId) {
  const { error } = await supabase.from('news').delete().eq('id', newsId);

  if (error) throw fromSupabaseError(error);
}
