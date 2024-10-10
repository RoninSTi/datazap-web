import axios from 'axios';
import { useQuery } from 'react-query';
import { z } from 'zod';

import { StoredLogSchema } from '@/types/log';

const LogResponseSchema = z.object({
  logs: StoredLogSchema.array(),
});

type LogResponse = z.infer<typeof LogResponseSchema>;

export const getLogs = async () => {
  const url = '/api/logs';

  const { data } = await axios.get<LogResponse>(url);

  return data;
};

export const useGetLogs = () => {
  return useQuery(['logs'], () => getLogs(), { keepPreviousData: true });
};
