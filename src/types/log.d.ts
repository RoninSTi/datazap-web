import type { LogProject } from './project';

export interface Log {
  filename: string;
  url: string;
  size: number;
  title: string;
  notes?: string;
}

export interface LogToBeUploaded extends Log {
  key: string;
}

export interface StoredLog extends Log {
  id: string;
  createdAt: string;
  project?: LogProject;
}
