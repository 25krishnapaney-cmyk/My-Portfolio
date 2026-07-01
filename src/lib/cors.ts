/**
 * CORS Security & Origin Verification Utility
 * Enforces strict Cross-Origin Resource Sharing (CORS) policies by verifying request origins
 * against trusted origins defined in environment variables.
 */

import { secureLog } from './logger';

export function getAllowedOrigins(): string[] {
  const envOrigins = process.env.ALLOWED_ORIGIN || '';
  const origins = envOrigins
    .split(',')
    .map((o) => o.trim())
    .filter(Boolean);

  // Always include localhost in development mode if not explicitly present
  if (process.env.NODE_ENV !== 'production') {
    if (!origins.includes('http://localhost:3000')) {
      origins.push('http://localhost:3000');
    }
    if (!origins.includes('http://127.0.0.1:3000')) {
      origins.push('http://127.0.0.1:3000');
    }
  }

  return origins;
}

/**
 * Checks whether a request origin is strictly allowed.
 * Requests from same-origin (where Origin header is missing) are permitted by default for Next.js internal calls.
 */
export function isOriginAllowed(origin: string | null): boolean {
  // Allow same-origin requests (e.g. Next.js server actions or internal fetch without Origin header)
  if (!origin) return true;

  const allowedOrigins = getAllowedOrigins();
  const isAllowed = allowedOrigins.includes(origin);

  if (!isAllowed) {
    secureLog.warn(`Blocked unauthorized CORS request from origin: [${origin}]`);
  }

  return isAllowed;
}

/**
 * Standardizes secure CORS headers for API responses and preflight OPTIONS requests.
 */
export function getCorsHeaders(req: Request): Record<string, string> {
  const origin = req.headers.get('origin');
  const allowedOrigins = getAllowedOrigins();
  
  // Choose the matching origin or fall back to the primary allowed origin
  const allowOrigin = origin && allowedOrigins.includes(origin)
    ? origin
    : allowedOrigins[0] || 'http://localhost:3000';

  return {
    'Access-Control-Allow-Origin': allowOrigin,
    'Access-Control-Allow-Methods': 'GET, POST, OPTIONS',
    'Access-Control-Allow-Headers': 'Content-Type, Authorization, X-Requested-With, X-RateLimit-Limit, X-RateLimit-Remaining, Retry-After',
    'Access-Control-Max-Age': '86400', // Cache preflight for 24 hours
    'Vary': 'Origin',
  };
}
