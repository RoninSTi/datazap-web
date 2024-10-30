import type { NextRequest } from 'next/server';
import { NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { z } from 'zod';

import { authOptions } from '@/config/auth';
import prisma from '@/database/client';

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

export async function POST(request: NextRequest) {
  const session = await getServerSession(authOptions);

  if (!session)
    return NextResponse.json(
      {
        error: 'You must be logged in.',
      },
      {
        status: 401,
      },
    );

  const userId = session.userDetails?.userId;

  if (!userId)
    return NextResponse.json(
      {
        error: 'User not found.',
      },
      {
        status: 404,
      },
    );

  const body = await request.json();

  const parsedBody = LogPostRequestSchema.safeParse(body);

  if (parsedBody.success === false) {
    NextResponse.json(
      {
        error: parsedBody.error,
      },
      {
        status: 400,
      },
    );
  }

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
    NextResponse.json(
      {
        error: 'Limit Exceeded',
      },
      {
        status: 403,
      },
    );
  }

  await prisma.log.createMany({
    data: parsedBody.data?.map((log) => ({ ...log, createdBy: userId })) ?? [],
  });

  return NextResponse.json({
    status: 201,
  });
}

export async function GET() {
  const session = await getServerSession(authOptions);

  if (!session)
    return NextResponse.json(
      {
        error: 'You must be logged in.',
      },
      {
        status: 401,
      },
    );

  const userId = session.userDetails?.userId;

  if (!userId)
    return NextResponse.json(
      {
        error: 'User not found.',
      },
      {
        status: 404,
      },
    );

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
