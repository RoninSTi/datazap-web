import axios from 'axios';
import { useMutation, useQueryClient } from 'react-query';

import type {
  PostFavoriteLogsBody,
  PostFavoriteProjectsBody,
} from '@/types/next-auth';

type FavoriteLogResponse = {
  message: 'success';
};

const favoriteLog = async ({
  logId,
}: PostFavoriteLogsBody): Promise<FavoriteLogResponse> => {
  const url = '/api/favorite/logs';

  const { data } = await axios.post<FavoriteLogResponse>(url, {
    data: {
      logId,
    },
  });

  return data;
};

export const useFavoriteLog = () => {
  const client = useQueryClient();

  return useMutation({
    mutationFn: ({ logId }: PostFavoriteLogsBody) => favoriteLog({ logId }),
    onSuccess: () => {
      client.invalidateQueries('logFavorites');
    },
  });
};

type FavoriteProjectResponse = {
  message: 'success';
};

const favoriteProject = async ({
  projectId,
}: PostFavoriteProjectsBody): Promise<FavoriteProjectResponse> => {
  const url = '/api/favorite/projects';

  const { data } = await axios.post<FavoriteProjectResponse>(url, {
    data: {
      projectId,
    },
  });

  return data;
};

export const useFavoriteProject = () => {
  const client = useQueryClient();

  return useMutation({
    mutationFn: ({ projectId }: PostFavoriteProjectsBody) =>
      favoriteProject({ projectId }),
    onSuccess: () => {
      client.invalidateQueries('projectFavorites');
    },
  });
};
