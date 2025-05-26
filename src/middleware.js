import { NextResponse } from 'next/server';

export function middleware(request) {
  const response = NextResponse.next();

  // Set security headers
  response.headers.set('X-DNS-Prefetch-Control', 'on');
  response.headers.set('Strict-Transport-Security', 'max-age=63072000; includeSubDomains; preload');
  response.headers.set('X-XSS-Protection', '1; mode=block');
  response.headers.set('X-Frame-Options', 'SAMEORIGIN');
  response.headers.set('X-Content-Type-Options', 'nosniff');
  response.headers.set('Referrer-Policy', 'strict-origin-when-cross-origin');

  // Handle static files
  if (request.nextUrl.pathname.startsWith('/_next/static/')) {
    if (request.nextUrl.pathname.endsWith('.js')) {
      response.headers.set('Content-Type', 'application/javascript');
    } else if (request.nextUrl.pathname.endsWith('.css')) {
      response.headers.set('Content-Type', 'text/css');
    } else if (request.nextUrl.pathname.endsWith('.json')) {
      response.headers.set('Content-Type', 'application/json');
    }
  }

  return response;
}

export const config = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - api (API routes)
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     */
    '/((?!api|_next/static|_next/image|favicon.ico).*)',
  ],
}; 