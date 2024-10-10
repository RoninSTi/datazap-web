import axios from 'axios';
import { useMutation, useQueryClient } from 'react-query';
import type { z } from 'zod';

import type { LogPostRequestSchema } from '@/app/api/logs/route';

type AddLogResponse = {
  message: 'success';
};

type AddLogsParams = {
  logs: z.infer<typeof LogPostRequestSchema>;
};

const addLogs = async ({ logs }: AddLogsParams): Promise<AddLogResponse> => {
  const url = '/api/logs';

  const { data } = await axios.post<AddLogResponse>(url, {
    data: logs,
  });

  return data;
};

export const useAddLogs = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ logs }: AddLogsParams) => addLogs({ logs }),
    onSuccess: () => {
      queryClient.invalidateQueries(['projects', 'logs', 'projectLogs']);
    },
  });
};
