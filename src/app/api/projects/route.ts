import { NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';

import { authOptions } from '@/config/auth';
import prisma from '@/database/client';
import type { ProjectPostBody, ProjectPostRequest } from '@/types/next-auth';

export async function POST(request: ProjectPostRequest) {
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
    NextResponse.json({
      error: 'Limit Exceeded',
      status: 403,
    });
  }

  const body: { data: ProjectPostBody } = await request.json();

  const project = body.data;

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
