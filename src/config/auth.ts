import { PrismaAdapter } from '@auth/prisma-adapter';
import { PrismaClient } from '@prisma/client';
import type { NextAuthOptions } from 'next-auth';
import GoogleProvider from 'next-auth/providers/google';

const prisma = new PrismaClient();

export const authOptions: NextAuthOptions = {
  adapter: PrismaAdapter(prisma),
  callbacks: {
    async session({ session, user }) {
      const userDetails = await prisma.userDetails.findUnique({
        where: {
          userId: user.id,
        },
      });

      const updatesSession = { ...session };

      updatesSession.userDetails = userDetails;

      updatesSession.userId = user.id;

      return updatesSession;
    },
  },
  pages: {
    signIn: 'auth/signin',
  },
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID ?? '',
      clientSecret: process.env.GOOGLE_CLIENT_SECRET ?? '',
    }),
  ],
};
