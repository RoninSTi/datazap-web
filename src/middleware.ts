import type { NextRequest } from 'next/server';
import { NextResponse } from 'next/server';
import { getToken } from 'next-auth/jwt';

// Define routes that should be protected
const PROTECTED_API_ROUTES = [
  '/api/logs',
  '/api/projects',
  '/api/user',
  '/api/favorite',
  '/api/s3-upload',
];

/**
 * Middleware function to protect routes that require authentication
 */
export async function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  // Check if the path is a protected API route
  const isProtectedApiRoute = PROTECTED_API_ROUTES.some(
    (route) => pathname.startsWith(route) && pathname !== '/api/auth',
  );

  if (isProtectedApiRoute) {
    // Get the user's session token
    const token = await getToken({
      req: request,
      secret: process.env.NEXTAUTH_SECRET,
    });

    // If no token exists, user is not authenticated
    if (!token) {
      return NextResponse.json(
        { error: 'You must be logged in.' },
        { status: 401 },
      );
    }

    // If token doesn't include userDetails/userId, user record is incomplete
    if (!token?.userDetails?.userId) {
      return NextResponse.json({ error: 'User not found.' }, { status: 404 });
    }

    // Clone the request headers and add user ID
    const requestHeaders = new Headers(request.headers);
    requestHeaders.set('x-user-id', token.userDetails.userId);

    // Return a new request with the modified headers
    return NextResponse.next({
      request: {
        headers: requestHeaders,
      },
    });
  }

  return NextResponse.next();
}

// Configure middleware to run only on matching routes
export const config = {
  matcher: [
    // Match all API routes except auth routes
    '/api/((?!auth).*)',
  ],
};
