import { z } from 'zod';

import { UserIdSchema } from './user';

export const ProjectIdSchema = z.string().brand('ProjectId');

export type ProjectId = z.infer<typeof ProjectIdSchema>;

export const ProjectSchema = z.object({
  id: ProjectIdSchema,
  isPrivate: z.boolean(),
  name: z.string(),
  description: z.string().nullish(),
  photo: z.string().nullish(),
  createdAt: z.string().transform((arg) => new Date(arg)),
  updatedAt: z.string().transform((arg) => new Date(arg)),
  createdBy: UserIdSchema,
});

export type Project = z.infer<typeof ProjectSchema>;

export const ProjectToBeCreatedSchema = ProjectSchema.omit({
  id: true,
});

export type ProjectToBeCreated = z.infer<typeof ProjectToBeCreatedSchema>;

export const LogProjectSchema = ProjectSchema.pick({
  id: true,
  name: true,
});

export type LogProject = z.infer<typeof LogProjectSchema>;
