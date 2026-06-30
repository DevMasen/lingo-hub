// src/api/mappers/news.mapper.js
//
// Converts between Supabase's raw `news` row (snake_case) and the app's
// domain NewsItem type (camelCase). See news.types.js for the target
// shape.

/** Converts a raw Supabase row into our domain NewsItem type. */
export function toNewsItem(row) {
  return {
    id: row.id,
    label: row.label,
    body: row.body,
    publishedAt: row.published_at,
  };
}

/** Converts an array of raw Supabase rows. */
export function toNewsItems(rows) {
  return (rows ?? []).map(toNewsItem);
}

/**
 * Converts our domain NewsItem/NewNewsItem shape into the raw
 * insert/update payload Supabase expects.
 */
export function toNewsRow(newsItem) {
  return {
    label: newsItem.label,
    body: newsItem.body,
    published_at: newsItem.publishedAt,
  };
}
