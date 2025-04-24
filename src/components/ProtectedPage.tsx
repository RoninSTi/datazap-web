'use client';

import { redirect } from 'next/navigation';
import { useSession } from 'next-auth/react';
import type { PropsWithChildren } from 'react';
import { useEffect } from 'react';

const ProtectedPage: React.FC<PropsWithChildren> = ({ children }) => {
  const { status } = useSession();

  useEffect(() => {
    if (status === 'unauthenticated') redirect('/auth/signin');
  }, [status]);

  return <div className="flex flex-1 flex-col">{children}</div>;
};

export { ProtectedPage };
