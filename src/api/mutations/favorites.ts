import axios from 'axios';
import { useMutation, useQueryClient } from 'react-query';

import type { PostFavoriteLogsBody } from '@/types/next-auth';

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
