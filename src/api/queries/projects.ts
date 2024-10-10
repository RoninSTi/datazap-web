import { useQuery } from 'react-query';
import { z } from 'zod';

import { ProjectSchema } from '@/types/project';

const ProjectResponseSchema = z.object({
  projects: ProjectSchema.array(),
});

export const getProjects = async () => {
  const url = '/api/projects';

  const response = await (await fetch(url)).json();

  const parsedData = ProjectResponseSchema.parse(response);

  return parsedData;
};

export const useGetProjects = () => {
  return useQuery(['projects'], () => getProjects(), {
    keepPreviousData: true,
  });
};
