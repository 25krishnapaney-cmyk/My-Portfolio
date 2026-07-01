import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import { checkRateLimit, getClientIp } from '@/lib/rate-limit';
import { contactFormSchema, formatValidationErrors } from '@/lib/validations';
import { secureLog } from '@/lib/logger';
import { getCorsHeaders } from '@/lib/cors';

const CONTACT_RATE_LIMIT = parseInt(process.env.RATE_LIMIT_CONTACT_PER_MIN || '5', 10);

export async function POST(req: NextRequest) {
  const corsHeaders = getCorsHeaders(req);
  const clientIp = getClientIp(req.headers);

  try {
    // 1. Rate Limiting Check (5 requests per minute per IP)
    const rateLimit = await checkRateLimit(clientIp, CONTACT_RATE_LIMIT, 60);

    const headers = {
      ...corsHeaders,
      'X-RateLimit-Limit': rateLimit.limit.toString(),
      'X-RateLimit-Remaining': rateLimit.remaining.toString(),
    };

    if (!rateLimit.success) {
      const retryAfterSec = Math.ceil((rateLimit.reset - Date.now()) / 1000);
      secureLog.warn(`Contact form rate limit exceeded for IP: [${clientIp}]`);
      
      return NextResponse.json(
        {
          error: 'Too many requests. Please try again later.',
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

    const validationResult = contactFormSchema.safeParse(rawBody);

    if (!validationResult.success) {
      const errors = formatValidationErrors(validationResult.error);
      return NextResponse.json(
        { error: 'Validation failed. Please check your inputs.', details: errors },
        { status: 400, headers }
      );
    }

    const validData = validationResult.data;

    // 3. Process the Contact Form Submission securely
    // In production, integrate here with an email provider (Resend, SendGrid, Amazon SES) or webhook
    secureLog.info(`Received contact form submission from: [${validData.email}] with subject [${validData.subject}]`);

    return NextResponse.json(
      {
        success: true,
        message: 'Your message has been sent successfully! Krishna will get back to you soon.',
      },
      { status: 200, headers }
    );
  } catch (error) {
    secureLog.error('Unexpected error handling contact form submission:', error);
    return NextResponse.json(
      { error: 'An internal server error occurred. Please try again later.' },
      { status: 500, headers: corsHeaders }
    );
  }
}
