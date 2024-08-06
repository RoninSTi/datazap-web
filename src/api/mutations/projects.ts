import axios from 'axios';
import { useMutation, useQueryClient } from 'react-query';

import type { ProjectPostBody } from '@/types/next-auth';

type CreateProjectResponse = {
  message: 'success';
};

type CreateProjectParams = {
  project: ProjectPostBody;
};

const createProject = async ({
  project,
}: CreateProjectParams): Promise<CreateProjectResponse> => {
  const url = '/api/projects';

  const { data } = await axios.post<CreateProjectResponse>(url, {
    data: project,
  });

  return data;
};

export const useCreateProject = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({ project }: CreateProjectParams) =>
      createProject({ project }),
    onSuccess: () => {
      queryClient.invalidateQueries(['projects']);
    },
  });
};
