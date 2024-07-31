import { NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';

import { authOptions } from '@/config/auth';
import prisma from '@/database/client';
import type {
  PostFavoriteLogsBody,
  PostFavoriteLogsRequest,
} from '@/types/next-auth';

export async function POST(request: PostFavoriteLogsRequest) {
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

  const body: { data: PostFavoriteLogsBody } = await request.json();

  const { logId } = body.data;

  const isExisting = await prisma.logFavorite.findFirst({
    where: {
      favoritedBy: userId,
      logId,
    },
  });

  if (isExisting !== null) {
    await prisma.logFavorite.delete({
      where: {
        logId_favoritedBy: {
          logId,
          favoritedBy: userId,
        },
      },
    });

    return NextResponse.json({
      status: 200,
    });
  }

  await prisma.logFavorite.create({
    data: {
      favoritedBy: userId,
      logId,
    },
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
