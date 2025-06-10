import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import { isRateLimited } from './lib/limiter';
import { isValidatedIp } from './lib/validated-ips';

/**
 *  Middleware for IP validation and CAPTCHA requirement checks, ensuring secure access to the application
 *  Redirects the request to the /proxy route for CAPTCHA validation.
*/

export function middleware(request: NextRequest) {
  const ip = request.headers.get('x-real-ip') ?? request.headers.get('x-forwarded-for') ?? 'unknown';
  const url = request.nextUrl.pathname;

  const whiteListed = isValidatedIp(ip);

  if (isRateLimited(ip) && !whiteListed && !url.startsWith('/proxy')) {
    const redirectUrl = new URL('/proxy', request.url);
    redirectUrl.searchParams.set('next', url);
    return NextResponse.redirect(redirectUrl);
  }

  return NextResponse.next();
}
export const config = {
  matcher: ['/((?!_next/static|_next/image|favicon.ico).*)'],
};
