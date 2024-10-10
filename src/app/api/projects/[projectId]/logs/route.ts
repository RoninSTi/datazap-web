import type { NextRequest } from 'next/server';
import { NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';

import { authOptions } from '@/config/auth';
import prisma from '@/database/client';

export async function GET(request: NextRequest, { params }: any) {
  const session = await getServerSession(authOptions);

  const { projectId } = params;

  if (projectId === undefined || Array.isArray(projectId))
    return NextResponse.json(
      {
        error: 'Single Project Id required',
      },
      {
        status: 400,
      },
    );

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
