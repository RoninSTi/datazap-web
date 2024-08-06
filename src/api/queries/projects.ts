import axios from 'axios';
import { useQuery } from 'react-query';

import type { Project } from '@/types/project';

type ProjectResponse = {
  projects: Project[];
};

export const getProjects = async () => {
  const url = '/api/projects';

  const { data } = await axios.get<ProjectResponse>(url);

  return data;
};

export const useGetProjects = () => {
  return useQuery(['projects'], () => getProjects(), {
    keepPreviousData: true,
  });
};
