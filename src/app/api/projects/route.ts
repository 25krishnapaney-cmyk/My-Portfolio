import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import { checkRateLimit, getClientIp } from '@/lib/rate-limit';
import { projectQuerySchema } from '@/lib/validations';
import { secureLog } from '@/lib/logger';
import { getCorsHeaders } from '@/lib/cors';
import { projects } from '@/data/projects';

const PUBLIC_RATE_LIMIT = parseInt(process.env.RATE_LIMIT_PUBLIC_PER_MIN || '60', 10);

export async function GET(req: NextRequest) {
  const corsHeaders = getCorsHeaders(req);
  const clientIp = getClientIp(req.headers);

  try {
    // 1. Rate Limiting Check (60 requests per minute per IP)
    const rateLimit = await checkRateLimit(clientIp, PUBLIC_RATE_LIMIT, 60);

    const headers = {
      ...corsHeaders,
      'X-RateLimit-Limit': rateLimit.limit.toString(),
      'X-RateLimit-Remaining': rateLimit.remaining.toString(),
    };

    if (!rateLimit.success) {
      const retryAfterSec = Math.ceil((rateLimit.reset - Date.now()) / 1000);
      secureLog.warn(`Public API rate limit exceeded for IP: [${clientIp}]`);

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

    // 2. Parse and Validate Query Parameters
    const url = new URL(req.url);
    const rawParams = Object.fromEntries(url.searchParams.entries());
    const validationResult = projectQuerySchema.safeParse(rawParams);

    if (!validationResult.success) {
      return NextResponse.json(
        { error: 'Invalid query parameters provided.' },
        { status: 400, headers }
      );
    }

    const { category, search, page, limit } = validationResult.data;

    // 3. Filter projects safely based on query
    let filtered = [...projects];

    if (category && category !== 'ALL') {
      filtered = filtered.filter(
        (p) => p.category.toLowerCase() === category.toLowerCase()
      );
    }

    if (search) {
      const searchLower = search.toLowerCase();
      filtered = filtered.filter(
        (p) =>
          p.title.toLowerCase().includes(searchLower) ||
          p.description.toLowerCase().includes(searchLower) ||
          p.technologies.some((t) => t.toLowerCase().includes(searchLower))
      );
    }

    // Pagination
    const startIndex = (page - 1) * limit;
    const paginatedProjects = filtered.slice(startIndex, startIndex + limit);

    return NextResponse.json(
      {
        success: true,
        data: paginatedProjects,
        pagination: {
          total: filtered.length,
          page,
          limit,
          totalPages: Math.ceil(filtered.length / limit),
        },
      },
      { status: 200, headers }
    );
  } catch (error) {
    secureLog.error('Unexpected error fetching projects API:', error);
    return NextResponse.json(
      { error: 'An internal server error occurred.' },
      { status: 500, headers: corsHeaders }
    );
  }
}
