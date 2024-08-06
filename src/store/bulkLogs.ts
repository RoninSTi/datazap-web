import { create } from 'zustand';

interface BulkLogState {
  selectedLogs: string[];
  selectAll: (logIds: string[]) => void;
  selectLog: (logId: string) => void;
  clearSelected: () => void;
}

export const useBulkLogStore = create<BulkLogState>((set) => ({
  selectedLogs: [],
  selectAll: (logIds: string[]) => set(() => ({ selectedLogs: logIds })),
  selectLog: (logId: string) =>
    set((state) => {
      const exists = state.selectedLogs.some((el) => el === logId);

      const updatedSelection = exists
        ? state.selectedLogs.filter((el) => el !== logId)
        : [...state.selectedLogs, logId];

      return {
        selectedLogs: updatedSelection,
      };
    }),
  clearSelected: () => set({ selectedLogs: [] }),
}));
