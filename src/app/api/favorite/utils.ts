import { NextResponse } from 'next/server';
import prisma from '@/database/client';

/**
 * Helper function to toggle a log favorite
 */
export async function toggleLogFavorite(userId: string, logId: string) {
  // Verify the log exists
  const log = await prisma.log.findUnique({
    where: { id: logId },
  });

  if (!log) {
    return NextResponse.json(
      { error: 'Log not found' },
      { status: 404 }
    );
  }

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
      favorited: false,
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
    favorited: true,
  });
}

/**
 * Helper function to toggle a project favorite
 */
export async function toggleProjectFavorite(userId: string, projectId: string) {
  // Verify the project exists
  const project = await prisma.project.findUnique({
    where: { id: projectId },
  });

  if (!project) {
    return NextResponse.json(
      { error: 'Project not found' },
      { status: 404 }
    );
  }

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
      favorited: false,
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
    favorited: true,
  });
}