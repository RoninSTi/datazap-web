import axios from 'axios';
import { useMutation } from 'react-query';

import type { LogPostRequestBody } from '@/types/next-auth';

type AddLogResponse = {
  message: 'success';
};

type AddLogsParams = {
  logs: LogPostRequestBody[];
};

const addLogs = async ({ logs }: AddLogsParams): Promise<AddLogResponse> => {
  const url = '/api/logs';

  const { data } = await axios.post<AddLogResponse>(url, {
    data: logs,
  });

  return data;
};

export const useAddLogs = () => {
  return useMutation({
    mutationFn: ({ logs }: AddLogsParams) => addLogs({ logs }),
  });
};
