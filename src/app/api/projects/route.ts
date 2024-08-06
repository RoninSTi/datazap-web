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
    select: {
      id: true,
      createdAt: true,
      updatedAt: true,
      createdBy: true,
      name: true,
      description: true,
      photo: true,
      isPrivate: true,
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
