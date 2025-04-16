import { NextRequest, NextResponse } from 'next/server';
import createIntlMiddleware from 'next-intl/middleware';

// Create the internationalization middleware
const intlMiddleware = createIntlMiddleware({
  locales: ['en', 'es', 'fr'],
  defaultLocale: 'en',
  localePrefix: 'as-needed',
});

// Middleware composition function
export async function middleware(request: NextRequest) {
  // Check paths that should bypass internationalization
  const publicPatterns = ['/api/', '/images/', '/_next/', '/favicon.ico'];
  
  if (
    publicPatterns.some((pattern) =>
      request.nextUrl.pathname.startsWith(pattern)
    )
  ) {
    return NextResponse.next();
  }

  // Apply internationalization middleware last
  return intlMiddleware(request);
}

// Configure middleware matching
export const config = {
  matcher: ['/((?!api|_next|.*\\..*).*)'],
};
