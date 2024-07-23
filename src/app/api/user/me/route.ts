import { NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';

import { authOptions } from '@/config/auth';
import prisma from '@/database/client';

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
