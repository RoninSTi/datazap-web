import { NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';

import { authOptions } from '@/config/auth';

const authentication = async (): Promise<NextResponse> => {
  const session = await getServerSession(authOptions);

  console.log({ session });

  if (!session)
    return NextResponse.json(
      {
        error: 'You must be logged in.',
      },
      {
        status: 401,
      },
    );

  const response = NextResponse.next();

  return response;
};

export { authentication };
