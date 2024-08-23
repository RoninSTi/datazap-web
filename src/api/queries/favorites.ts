import axios from 'axios';
import { UseQueryResult, useQuery } from 'react-query';

import type { ProjectFavorite } from '@/types/favorites';
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
  return useQuery(['logFavorites'], () => getLogFavorites(), {
    keepPreviousData: true,
  });
};

type ProjectFavoriteResponse = {
  favoriteProjects: ProjectFavorite[];
};

export const getProjectFavorites = async () => {
  const url = '/api/favorite/projects';

  const { data } = await axios.get<ProjectFavoriteResponse>(url);

  return data;
};

export const useGetProjectFavorites: () => UseQueryResult<ProjectFavoriteResponse, unknown> = () => {
  return useQuery(['projectFavorites'], () => getProjectFavorites(), {
    keepPreviousData: true,
  });
};
