import type { NextRequest } from 'next/server';
import { NextResponse } from 'next/server';
import type { z } from 'zod';

import prisma from '@/database/client';
import { ensureUserId, getUserId } from '@/utils/auth';
import { withValidation } from '@/utils/validation';

import { FavoriteProjectSchema } from '../schemas';
import { toggleProjectFavorite } from '../utils';

// POST handler with validation middleware
export const POST = withValidation(
  FavoriteProjectSchema,
  async (
    request: NextRequest,
    validatedData: z.infer<typeof FavoriteProjectSchema>,
  ) => {
    // Get userId from request headers (set by middleware)
    const userId = getUserId(request);
    ensureUserId(userId);

    const { projectId } = validatedData.data;

    // Use the utility function to toggle the favorite
    return toggleProjectFavorite(userId, projectId);
  },
);

export async function GET(request: NextRequest) {
  // Get userId from request headers (set by middleware)
  const userId = getUserId(request);
  ensureUserId(userId);

  const favoriteProjects = await prisma.projectFavorite.findMany({
    where: {
      favoritedBy: userId,
    },
    orderBy: {
      createdAt: 'desc',
    },
  });

  return NextResponse.json(
    {
      favoriteProjects,
    },
    {
      status: 200,
    },
  );
}
