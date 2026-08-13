import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import jwt from 'jsonwebtoken';

export function middleware(request: NextRequest) {
  const path = request.nextUrl.pathname;

  // Public paths (no authentication required)
  const publicPaths = [
    '/',
    '/login',
    '/api/auth/login',
    '/api/auth/logout',
    '/api/auth/verify',
    '/about',
    '/contact',
    '/news',
    '/technology',
    '/economy',
    '/global',
    '/lifestyle',
    '/science',
    '/top-stories',
    '/privacy',
    '/subscription'
  ];

  // Check if path is public
  const isPublicPath = publicPaths.some(p => path === p || path.startsWith(p + '/'));
  
  // Admin paths that need protection
  const isAdminPath = path.startsWith('/admin');
  const isAdminApiPath = path.startsWith('/api/admin');

  // Get token from cookie
  const token = request.cookies.get('token')?.value;

  // Verify token
  let isAuthenticated = false;
  if (token) {
    try {
      jwt.verify(token, process.env.JWT_SECRET || 'your-secret-key');
      isAuthenticated = true;
    } catch (error) {
      // Token invalid or expired
      console.error('Token verification failed:', error);
    }
  }

  // Protect admin routes
  if ((isAdminPath || isAdminApiPath) && !isAuthenticated) {
    if (isAdminApiPath) {
      return NextResponse.json(
        { success: false, message: 'Unauthorized' },
        { status: 401 }
      );
    }
    return NextResponse.redirect(new URL('/login', request.url));
  }

  // Redirect to admin if already authenticated and trying to access login
  if (isAuthenticated && path === '/login') {
    return NextResponse.redirect(new URL('/admin', request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    '/admin/:path*',
    '/api/admin/:path*',
    '/api/auth/:path*',
    '/login'
  ]
};