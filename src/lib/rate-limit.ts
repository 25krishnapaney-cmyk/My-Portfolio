import { Ratelimit } from '@upstash/ratelimit';
import { Redis } from '@upstash/redis';
import { secureLog } from './logger';

export interface RateLimitResult {
  success: boolean;
  limit: number;
  remaining: number;
  reset: number; // Unix timestamp in milliseconds
}

// -----------------------------------------------------------------------------
// 1. Upstash Redis Setup (Distributed Rate Limiting for Vercel / Edge)
// -----------------------------------------------------------------------------
let upstashRatelimiter: Ratelimit | null = null;
const upstashUrl = process.env.UPSTASH_REDIS_REST_URL;
const upstashToken = process.env.UPSTASH_REDIS_REST_TOKEN;

if (upstashUrl && upstashToken && upstashUrl.startsWith('https://')) {
  try {
    const redis = new Redis({
      url: upstashUrl,
      token: upstashToken,
    });
    // Default sliding window: 10 requests per 10 seconds as baseline; customizable per route
    upstashRatelimiter = new Ratelimit({
      redis,
      limiter: Ratelimit.slidingWindow(10, '10 s'),
      analytics: true,
      prefix: '@portfolio/ratelimit',
    });
    secureLog.info('Initialized Upstash Redis distributed rate limiter.');
  } catch (error) {
    secureLog.error('Failed to initialize Upstash Redis rate limiter. Falling back to in-memory store.', error);
  }
} else {
  secureLog.warn(
    'Upstash Redis environment variables not configured. Using in-memory token bucket rate limiter fallback. ' +
    'NOTE: In-memory rate limiting is suitable for development or single-instance servers, but has limitations ' +
    'in distributed/serverless environments (like Vercel) where state is not shared across lambda instances.'
  );
}

// -----------------------------------------------------------------------------
// 2. In-Memory LRU Token Bucket Fallback (For Dev & Unconfigured Environments)
// -----------------------------------------------------------------------------
interface TokenBucket {
  count: number;
  reset: number;
}

const inMemoryCache = new Map<string, TokenBucket>();

// Automatic cleanup of expired tokens every 5 minutes to prevent memory leaks
if (typeof setInterval !== 'undefined') {
  setInterval(() => {
    const now = Date.now();
    for (const [key, bucket] of inMemoryCache.entries()) {
      if (now > bucket.reset) {
        inMemoryCache.delete(key);
      }
    }
  }, 5 * 60 * 1000).unref?.();
}

/**
 * Enterprise Rate Limiter
 * Check if a given identifier (e.g. IP address or Token) has exceeded its allowed rate limit.
 *
 * @param identifier - Unique identifier (e.g., client IP or User ID)
 * @param limit - Maximum requests allowed in the time window
 * @param windowSec - Time window duration in seconds
 * @returns Promise<RateLimitResult>
 */
export async function checkRateLimit(
  identifier: string,
  limit: number,
  windowSec: number
): Promise<RateLimitResult> {
  const windowMs = windowSec * 1000;
  const now = Date.now();
  const cacheKey = `${identifier}:${limit}:${windowSec}`;

  // Use Upstash Redis if configured and available
  if (upstashRatelimiter) {
    try {
      // Create a custom sliding window limiter for the specific limit & duration requested
      const customLimiter = new Ratelimit({
        redis: Redis.fromEnv(),
        limiter: Ratelimit.slidingWindow(limit, `${windowSec} s`),
        prefix: '@portfolio/ratelimit',
      });
      const res = await customLimiter.limit(cacheKey);
      return {
        success: res.success,
        limit,
        remaining: res.remaining,
        reset: res.reset,
      };
    } catch (err) {
      secureLog.error('Upstash rate limit check failed, falling back to in-memory store:', err);
      // Fall through to in-memory store on Upstash network error
    }
  }

  // In-Memory Fallback Implementation
  const bucket = inMemoryCache.get(cacheKey);

  if (!bucket || now > bucket.reset) {
    // Start a new window
    const resetTime = now + windowMs;
    inMemoryCache.set(cacheKey, { count: 1, reset: resetTime });
    return {
      success: true,
      limit,
      remaining: limit - 1,
      reset: resetTime,
    };
  }

  // Increment existing window count
  bucket.count += 1;
  const remaining = Math.max(0, limit - bucket.count);
  const success = bucket.count <= limit;

  if (!success) {
    secureLog.warn(`Rate limit exceeded for identifier [${identifier}] on key [${cacheKey}].`);
  }

  return {
    success,
    limit,
    remaining,
    reset: bucket.reset,
  };
}

/**
 * Helper to extract client IP address from Next.js request headers
 */
export function getClientIp(reqHeaders: Headers): string {
  const forwardedFor = reqHeaders.get('x-forwarded-for');
  if (forwardedFor) {
    return forwardedFor.split(',')[0].trim();
  }
  const realIp = reqHeaders.get('x-real-ip');
  if (realIp) {
    return realIp.trim();
  }
  return '127.0.0.1'; // Local dev fallback IP
}
