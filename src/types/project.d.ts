export interface Project {
  id: string;
  name: string;
  description?: string;
  photo?: string;
}

export type ProjectToBeCreated = Omit<Project, 'id'>;

export type LogProject = Pick<Project, 'id' | 'name'>;
