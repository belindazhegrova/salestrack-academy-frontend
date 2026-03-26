import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import { jwtDecode } from 'jwt-decode';

type TokenPayload = {
  userId: string;
  email: string;
  role: 'ADMIN' | 'AGENT';
  iat?: number;
  exp?: number;
};

export function middleware(request: NextRequest) {
  const token = request.cookies.get('access_token')?.value;
  const { pathname } = request.nextUrl;

  const isAuthPage =
    pathname.startsWith('/login') || pathname.startsWith('/register');

  const isAdminRoute = pathname.startsWith('/admin');
  const isAgentRoute = pathname.startsWith('/agent');
  const isProtectedRoute = isAdminRoute || isAgentRoute;

  if (!token && isProtectedRoute) {
    return NextResponse.redirect(new URL('/login', request.url));
  }

  if (token) {
    try {
      const decoded = jwtDecode<TokenPayload>(token);

      if (isAdminRoute && decoded.role !== 'ADMIN') {
        return NextResponse.redirect(new URL('/', request.url));
      }

      if (isAgentRoute && decoded.role !== 'AGENT') {
        return NextResponse.redirect(new URL('/', request.url));
      }

      if (isAuthPage) {
        return NextResponse.redirect(new URL('/', request.url));
      }
    } catch {
      return NextResponse.redirect(new URL('/login', request.url));
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: ['/admin/:path*', '/agent/:path*', '/login', '/register'],
};