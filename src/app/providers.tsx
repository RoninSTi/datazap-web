'use client';

import { SessionProvider } from 'next-auth/react';
import type { PropsWithChildren } from 'react';
import { QueryClient, QueryClientProvider } from 'react-query';

const queryClient = new QueryClient();

export const Providers: React.FC<PropsWithChildren<unknown>> = ({
  children,
}) => {
  return (
    <SessionProvider>
      <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
    </SessionProvider>
  );
};
