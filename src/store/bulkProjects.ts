import { create } from 'zustand';

interface BulkProjectState {
  selectedProjects: string[];
  selectAll: (projectIds: string[]) => void;
  selectProject: (projectId: string) => void;
  clearSelected: () => void;
}

export const useBulkProjectStore = create<BulkProjectState>((set) => ({
  selectedProjects: [],
  selectAll: (projectIds: string[]) =>
    set(() => ({ selectedProjects: projectIds })),
  selectProject: (projectId: string) =>
    set((state) => {
      const exists = state.selectedProjects.some((el) => el === projectId);

      const updatedSelection = exists
        ? state.selectedProjects.filter((el) => el !== projectId)
        : [...state.selectedProjects, projectId];

      return {
        selectedProjects: updatedSelection,
      };
    }),
  clearSelected: () => set({ selectedProjects: [] }),
}));
