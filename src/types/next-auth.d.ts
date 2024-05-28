import type { UserDetails } from '@prisma/client';
import type { DefaultSession } from 'next-auth';

declare module 'next-auth' {
  interface Session extends DefaultSession {
    userDetails: UserDetails | null;
    userId: string;
  }
}
