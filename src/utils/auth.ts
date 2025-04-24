import { type NextRequest } from 'next/server';

/**
 * Gets the authenticated user ID from request headers
 * This ID is set by the middleware for protected routes
 */
export function getUserId(request: NextRequest): string | null {
  return request.headers.get('x-user-id');
}

/**
 * Type guard to check if userId exists and throw an error if not
 * This is useful for routes where you've already verified auth in middleware
 * but want to ensure type safety with the userId
 */
export function ensureUserId(userId: string | null): asserts userId is string {
  if (!userId) {
    throw new Error('User ID is required but not found in request');
  }
}