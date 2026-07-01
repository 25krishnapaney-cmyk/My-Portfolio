import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import { checkRateLimit, getClientIp } from '@/lib/rate-limit';
import { authVerifySchema } from '@/lib/validations';
import { secureLog } from '@/lib/logger';
import { getCorsHeaders } from '@/lib/cors';

const AUTH_RATE_LIMIT = parseInt(process.env.RATE_LIMIT_AUTH_PER_15MIN || '5', 10);
const WINDOW_SEC = 15 * 60; // 15 minutes

export async function POST(req: NextRequest) {
  const corsHeaders = getCorsHeaders(req);
  const clientIp = getClientIp(req.headers);

  try {
    // 1. Rate Limiting Check (5 requests per 15 minutes per IP)
    const rateLimit = await checkRateLimit(clientIp, AUTH_RATE_LIMIT, WINDOW_SEC);

    const headers = {
      ...corsHeaders,
      'X-RateLimit-Limit': rateLimit.limit.toString(),
      'X-RateLimit-Remaining': rateLimit.remaining.toString(),
    };

    if (!rateLimit.success) {
      const retryAfterSec = Math.ceil((rateLimit.reset - Date.now()) / 1000);
      secureLog.warn(`Authentication rate limit exceeded for IP: [${clientIp}]`);

      return NextResponse.json(
        {
          error: 'Too many authentication requests. Please try again later.',
          retryAfterSec: Math.max(1, retryAfterSec),
        },
        {
          status: 429,
          headers: {
            ...headers,
            'Retry-After': Math.max(1, retryAfterSec).toString(),
          },
        }
      );
    }

    // 2. Parse and Validate Request Body
    let rawBody: unknown;
    try {
      rawBody = await req.json();
    } catch {
      return NextResponse.json(
        { error: 'Invalid JSON payload format.' },
        { status: 400, headers }
      );
    }

    const validationResult = authVerifySchema.safeParse(rawBody);

    if (!validationResult.success) {
      return NextResponse.json(
        { error: 'Invalid authentication token provided.' },
        { status: 400, headers }
      );
    }

    const { token } = validationResult.data;

    // 3. Verify against secret token safely
    const expectedSecret = process.env.API_SECRET_TOKEN;
    if (!expectedSecret || expectedSecret.includes('placeholder')) {
      secureLog.warn('API_SECRET_TOKEN is not configured securely in environment variables.');
    }

    if (token === expectedSecret) {
      secureLog.info(`Successful authentication verification for IP: [${clientIp}]`);
      return NextResponse.json(
        { success: true, message: 'Authentication verified.' },
        { status: 200, headers }
      );
    } else {
      secureLog.warn(`Failed authentication attempt from IP: [${clientIp}]`);
      return NextResponse.json(
        { error: 'Unauthorized: Invalid credentials.' },
        { status: 401, headers }
      );
    }
  } catch (error) {
    secureLog.error('Unexpected error in auth verification API:', error);
    return NextResponse.json(
      { error: 'An internal server error occurred.' },
      { status: 500, headers: corsHeaders }
    );
  }
}
