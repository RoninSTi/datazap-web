import type { NextRequest } from 'next/server';
import { NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';

import { authOptions } from '@/config/auth';
import prisma from '@/database/client';

const TIERS = {
  FREE: {
    logLimit: 50,
    projectLimit: 5,
  },
};

export async function PUT(request: NextRequest) {
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

  const { username, image, backgroundImage } = await request.json();

  const promises = [];

  if (image) {
    promises.push(
      prisma.user.update({
        where: {
          id: session.userId,
        },
        data: {
          image,
        },
      }),
    );
  }

  promises.push(
    prisma.userDetails.upsert({
      where: {
        userId: session.userId,
      },
      update: {
        backgroundImage,
        username,
      },
      create: {
        backgroundImage,
        username,
        userId: session.userId,
        projectLimit: TIERS.FREE.projectLimit,
        logLimit: TIERS.FREE.logLimit,
      },
    }),
  );

  await Promise.all(promises);

  const user = await prisma.user.findUnique({
    where: {
      id: session.userId,
    },
    include: {
      userDetails: true,
    },
  });

  return NextResponse.json(
    {
      user,
    },
    {
      status: 200,
    },
  );
}
