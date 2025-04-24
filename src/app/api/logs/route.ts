import type { NextRequest } from 'next/server';
import { NextResponse } from 'next/server';
import { z } from 'zod';

import prisma from '@/database/client';
import { ensureUserId, getUserId } from '@/utils/auth';
import { withValidation } from '@/utils/validation';

export const LogPostRequestSchema = z
  .object({
    filename: z.string(),
    title: z.string(),
    notes: z.string().optional(),
    url: z.string(),
    projectId: z.string().optional(),
    size: z.number(),
  })
  .array();

// POST handler with validation middleware
export const POST = withValidation(
  LogPostRequestSchema,
  async (
    request: NextRequest,
    validatedData: z.infer<typeof LogPostRequestSchema>,
  ) => {
    // Get userId from request headers (set by middleware)
    const userId = getUserId(request);
    ensureUserId(userId);

    const logCount = await prisma.log.count({
      where: {
        createdBy: userId,
      },
    });

    const userDetails = await prisma.userDetails.findUnique({
      where: {
        userId,
      },
    });

    const logLimit = userDetails?.logLimit ?? 0;

    if (logCount >= logLimit) {
      return NextResponse.json(
        {
          error: 'Limit Exceeded',
        },
        {
          status: 403,
        },
      );
    }

    await prisma.log.createMany({
      data: validatedData.map((log) => ({ ...log, createdBy: userId })),
    });

    return NextResponse.json({
      status: 201,
    });
  },
);

export async function GET(request: NextRequest) {
  // Get userId from request headers (set by middleware)
  const userId = getUserId(request);
  ensureUserId(userId);

  const logs = await prisma.log.findMany({
    where: {
      createdBy: userId,
    },
    orderBy: {
      createdAt: 'desc',
    },
    select: {
      id: true,
      createdAt: true,
      updatedAt: true,
      createdBy: true,
      title: true,
      url: true,
      size: true,
      notes: true,
      project: {
        select: {
          id: true,
          name: true,
        },
      },
    },
  });

  return NextResponse.json(
    {
      logs,
    },
    {
      status: 200,
    },
  );
}
