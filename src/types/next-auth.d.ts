import type { UserDetails } from '@prisma/client';
import type { NextRequest } from 'next/server';
import type { DefaultSession } from 'next-auth';

declare module 'next-auth' {
  interface Session extends DefaultSession {
    userDetails: UserDetails | null;
    userId: string;
  }
}

type PostFavoriteLogsBody = {
  logId: string;
};

interface PostFavoriteLogsRequest extends NextRequest {
  body: PostFavoriteLogsBody;
}

type PostFavoriteProjectsBody = {
  projectId: string;
};

interface PostFavoriteProjectsRequest extends NextRequest {
  body: PostFavoriteProjectsBody;
}

type ProjectPostBody = {
  name: string;
  description?: string;
  photo?: string;
  isPrivate: boolean;
};

interface ProjectPostRequest extends NextRequest {
  body: ProjectPostBody;
}
