import type { StoredLog } from './log';

export interface Project {
  id: string;
  isPrivate: boolean;
  name: string;
  description?: string;
  photo?: string;
  createdAt: string;
  updatedAt: string;
  createdBy: string;
  logs: StoredLog[];
}

export type ProjectToBeCreated = Omit<Project, 'id'>;

export type LogProject = Pick<Project, 'id' | 'name'>;
