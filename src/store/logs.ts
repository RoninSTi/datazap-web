import { create } from 'zustand';

import type { LogToBeUploaded } from '@/types/log';

interface LogState {
  logs: LogToBeUploaded[];
  addLog: (log: LogToBeUploaded) => void;
  clearLogs: () => void;
  removeLog: (log: LogToBeUploaded) => void;
  replaceLog: (log: LogToBeUploaded) => void;
  setLogs: (logs: LogToBeUploaded[]) => void;
}

export const useLogStore = create<LogState>((set) => ({
  logs: [],
  addLog: (log) => set((state) => ({ logs: [...state.logs, log] })),
  clearLogs: () => set({ logs: [] }),
  removeLog: (log) =>
    set((state) => ({ logs: state.logs.filter((l) => l.key !== log.key) })),
  replaceLog: (log) =>
    set((state) => ({
      logs: state.logs.map((l) => (l.key === log.key ? log : l)),
    })),
  setLogs: (logs) => set({ logs }),
}));
