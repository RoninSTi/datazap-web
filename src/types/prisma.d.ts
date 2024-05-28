import type { User, UserDetails } from '@prisma/client';

declare module '@prisma/client' {
  interface ExtendedUser extends User {
    userDetails: UserDetails;
  }
}
