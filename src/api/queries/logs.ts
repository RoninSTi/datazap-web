import axios from 'axios';
import { useQuery } from 'react-query';

import type { StoredLog } from '@/types/log';

type LogResponse = {
  logs: StoredLog[];
};

export const getLogs = async () => {
  const url = '/api/logs';

  const { data } = await axios.get<LogResponse>(url);

  return data;
};

export const useGetLogs = () => {
  return useQuery(['logs'], () => getLogs());
};
