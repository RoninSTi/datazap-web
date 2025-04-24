import type { NextRequest } from 'next/server';
import { NextResponse } from 'next/server';
import { z } from 'zod';

import prisma from '@/database/client';
import { getUserId, ensureUserId } from '@/utils/auth';
import { withValidation } from '@/utils/validation';

// Define the schema for project creation
export const ProjectPostSchema = z.object({
  data: z.object({
    name: z.string().min(1, 'Project name is required'),
    description: z.string().optional(),
    photo: z.string().optional(),
    isPrivate: z.boolean().default(false)
  })
});

// POST handler with validation middleware
export const POST = withValidation(
  ProjectPostSchema, 
  async (request: NextRequest, validatedData: z.infer<typeof ProjectPostSchema>) => {
    // Get userId from request headers (set by middleware)
    const userId = getUserId(request);
    ensureUserId(userId);

    const projectCount = await prisma.project.count({
      where: {
        createdBy: userId,
      },
    });

    const userDetails = await prisma.userDetails.findUnique({
      where: {
        userId,
      },
    });

    const projectLimit = userDetails?.projectLimit ?? 0;

    if (projectCount >= projectLimit) {
      return NextResponse.json(
        {
          error: 'Limit Exceeded',
        },
        {
          status: 403,
        },
      );
    }

    const { data: project } = validatedData;

    await prisma.project.create({
      data: {
        name: project.name,
        description: project.description,
        photo: project.photo,
        createdBy: userId,
        isPrivate: project.isPrivate,
      },
    });

    return NextResponse.json({
      status: 200,
    });
  }
);

export async function GET(request: NextRequest) {
  // Get userId from request headers (set by middleware)
  const userId = getUserId(request);
  ensureUserId(userId);

  const projects = await prisma.project.findMany({
    where: {
      createdBy: userId,
    },
    orderBy: {
      createdAt: 'desc',
    },
  });

  return NextResponse.json(
    {
      projects,
    },
    {
      status: 200,
    },
  );
}