// src/api/errors/ApiError.js
//
// A single, backend-agnostic error shape. Supabase errors and (later)
// Django/DRF errors look completely different under the hood — this class
// normalizes both into one shape so React components only ever handle
// ONE kind of error object, regardless of which backend produced it.

export class ApiError extends Error {
  /**
   * @param {string} message - human-readable message safe to show in UI
   * @param {object} [options]
   * @param {string} [options.code] - machine-readable error code, e.g. 'NOT_FOUND', 'UNAUTHORIZED'
   * @param {number} [options.status] - HTTP-like status code, if applicable
   * @param {unknown} [options.cause] - the original raw error (Supabase error, fetch error, etc.)
   */
  constructor(message, { code = 'UNKNOWN', status = null, cause = null } = {}) {
    super(message);
    this.name = 'ApiError';
    this.code = code;
    this.status = status;
    this.cause = cause;
  }
}

/**
 * Converts a raw Supabase error into our normalized ApiError.
 * This is the ONLY place that needs to know what Supabase error objects
 * look like. When you move to Django, you write a sibling function like
 * `fromDjangoError(error)` and the rest of the app is untouched.
 */
export function fromSupabaseError(error) {
  if (!error) return null;

  // Supabase/Postgres unique constraint violation
  if (error.code === '23505') {
    return new ApiError('این گزارش از قبل وجود دارد.', {
      code: 'DUPLICATE',
      cause: error,
    });
  }

  // Supabase/Postgres foreign key violation
  if (error.code === '23503') {
    return new ApiError('گزارش مورد نظر پیدا نشد.', {
      code: 'INVALID_REFERENCE',
      cause: error,
    });
  }

  // Auth errors from supabase.auth.*
  if (error.message?.toLowerCase().includes('invalid login credentials')) {
    return new ApiError('ایمیل یا رمز عبور نامعتبر است.', {
      code: 'UNAUTHORIZED',
      status: 401,
      cause: error,
    });
  }

  return new ApiError(error.message || 'مشکلی به وجود آمده است!', {
    code: 'UNKNOWN',
    cause: error,
  });
}
