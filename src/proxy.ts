import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import { isOriginAllowed, getCorsHeaders } from '@/lib/cors';

export function proxy(req: NextRequest) {
  const origin = req.headers.get('origin');
  const method = req.method;

  // 1. Enforce CORS restrictions on API routes
  if (!isOriginAllowed(origin)) {
    return NextResponse.json(
      { error: 'Forbidden: Unauthorized cross-origin request.' },
      { status: 403 }
    );
  }

  // 2. Handle CORS preflight OPTIONS requests
  if (method === 'OPTIONS') {
    return new NextResponse(null, {
      status: 200,
      headers: getCorsHeaders(req),
    });
  }

  // 3. Prevent Oversized Payloads on mutations (POST / PUT / PATCH)
  if (['POST', 'PUT', 'PATCH'].includes(method)) {
    const contentLength = req.headers.get('content-length');
    if (contentLength && parseInt(contentLength, 10) > 50000) {
      return NextResponse.json(
        { error: 'Payload too large. Maximum allowed request size is 50KB.' },
        { status: 413, headers: getCorsHeaders(req) }
      );
    }
  }

  // 4. Continue to route handler and attach CORS headers to response
  const response = NextResponse.next();
  const corsHeaders = getCorsHeaders(req);
  
  for (const [key, value] of Object.entries(corsHeaders)) {
    response.headers.set(key, value);
  }

  return response;
}

// Scope proxy only to API routes
export const config = {
  matcher: '/api/:path*',
};
