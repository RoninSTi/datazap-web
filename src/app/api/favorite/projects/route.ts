import { NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';

import { authOptions } from '@/config/auth';
import prisma from '@/database/client';
import type {
  PostFavoriteProjectsBody,
  PostFavoriteProjectsRequest,
} from '@/types/next-auth';

export async function POST(request: PostFavoriteProjectsRequest) {
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

  const body: { data: PostFavoriteProjectsBody } = await request.json();

  const { projectId } = body.data;

  const isExisting = await prisma.projectFavorite.findFirst({
    where: {
      favoritedBy: userId,
      projectId,
    },
  });

  if (isExisting !== null) {
    await prisma.projectFavorite.delete({
      where: {
        projectId_favoritedBy: {
          projectId,
          favoritedBy: userId,
        },
      },
    });

    return NextResponse.json({
      status: 200,
    });
  }

  await prisma.projectFavorite.create({
    data: {
      favoritedBy: userId,
      projectId,
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
