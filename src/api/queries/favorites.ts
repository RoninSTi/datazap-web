import axios from 'axios';
import { useQuery } from 'react-query';

import type { LogFavorite } from '@/types/log';

type LogFavoriteResponse = {
  favoriteLogs: LogFavorite[];
};

export const getLogFavorites = async () => {
  const url = '/api/favorite/logs';

  const { data } = await axios.get<LogFavoriteResponse>(url);

  return data;
};

export const useGetLogFavorites = () => {
  return useQuery(['logFavorites'], () => getLogFavorites());
};
