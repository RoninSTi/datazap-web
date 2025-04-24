import type { NextRequest } from 'next/server';
import { NextResponse } from 'next/server';
import type { z } from 'zod';

import prisma from '@/database/client';
import { ensureUserId, getUserId } from '@/utils/auth';
import { withValidation } from '@/utils/validation';

import { FavoriteLogSchema } from '../schemas';
import { toggleLogFavorite } from '../utils';

// POST handler with validation middleware
export const POST = withValidation(
  FavoriteLogSchema,
  async (
    request: NextRequest,
    validatedData: z.infer<typeof FavoriteLogSchema>,
  ) => {
    // Get userId from request headers (set by middleware)
    const userId = getUserId(request);
    ensureUserId(userId);

    const { logId } = validatedData.data;

    // Use the utility function to toggle the favorite
    return toggleLogFavorite(userId, logId);
  },
);

export async function GET(request: NextRequest) {
  // Get userId from request headers (set by middleware)
  const userId = getUserId(request);
  ensureUserId(userId);

  const favoriteLogs = await prisma.logFavorite.findMany({
    where: {
      favoritedBy: userId,
    },
    orderBy: {
      createdAt: 'desc',
    },
  });

  return NextResponse.json(
    {
      favoriteLogs,
    },
    {
      status: 200,
    },
  );
}
