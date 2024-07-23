import { NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';

import { authOptions } from '@/config/auth';
import prisma from '@/database/client';
import type { LogPostRequest, LogPostRequestBody } from '@/types/next-auth';

export async function POST(request: LogPostRequest) {
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

  const body: { data: LogPostRequestBody[] } = await request.json();

  const logs = body.data;

  await prisma.log.createMany({
    data: logs.map((log) => ({ ...log, createdBy: userId })),
  });

  return NextResponse.json({
    status: 200,
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
