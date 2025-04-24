import type { NextRequest } from 'next/server';
import { NextResponse } from 'next/server';
import { z } from 'zod';

import prisma from '@/database/client';
import { ensureUserId, getUserId } from '@/utils/auth';

// Create a parameter validation schema
export const ProjectIdParamSchema = z.object({
  projectId: z.string({
    required_error: 'Project ID is required',
    invalid_type_error: 'Project ID must be a string',
  }),
});

export async function GET(
  request: NextRequest,
  { params }: { params: z.infer<typeof ProjectIdParamSchema> },
) {
  // Validate the projectId
  const result = ProjectIdParamSchema.safeParse(params);
  if (!result.success) {
    return NextResponse.json(
      {
        error: 'Invalid project ID',
        details: result.error.format(),
      },
      { status: 400 },
    );
  }

  const { projectId } = params;

  // Get userId from request headers (set by middleware)
  const userId = getUserId(request);
  ensureUserId(userId);

  // First check if the project exists and belongs to the user
  const project = await prisma.project.findFirst({
    where: {
      id: projectId,
      createdBy: userId,
    },
  });

  if (!project) {
    return NextResponse.json(
      {
        error: 'Project not found or you do not have access',
      },
      { status: 404 },
    );
  }

  const logs = await prisma.log.findMany({
    where: {
      projectId,
    },
    orderBy: {
      createdAt: 'desc',
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
