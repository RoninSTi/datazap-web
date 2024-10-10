import axios from 'axios';
import { useQuery } from 'react-query';
import { z } from 'zod';

import { StoredLogSchema } from '@/types/log';
import type { ProjectId } from '@/types/project';

const LogResponseSchema = z.object({
  logs: StoredLogSchema.array(),
});

type LogResponse = z.infer<typeof LogResponseSchema>;

interface ApiParams {
  projectId?: ProjectId;
}

export const getProjectLogs = async ({ projectId }: ApiParams) => {
  const url = `/api/projects/${projectId}/logs`;

  const { data } = await axios.get<LogResponse>(url);

  return data;
};

export const useGetProjectLogs = ({ projectId }: ApiParams) => {
  return useQuery(['projectLogs'], () => getProjectLogs({ projectId }), {
    keepPreviousData: true,
    enabled: projectId !== undefined,
  });
};
