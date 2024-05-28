'use client';

import { redirect } from 'next/navigation';
import { useSession } from 'next-auth/react';
import type { PropsWithChildren } from 'react';
import { useEffect } from 'react';

const ProtectedPage: React.FC<PropsWithChildren> = ({ children }) => {
  const { status } = useSession();

  console.log({ status });

  useEffect(() => {
    if (status === 'unauthenticated') redirect('/auth/signin');
  }, [status]);

  return children;
};

export { ProtectedPage };
