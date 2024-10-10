import { z } from 'zod';

import { ProjectIdSchema } from './project';
import { UserIdSchema } from './user';

export const LogSchema = z.object({
  filename: z.string(),
  url: z.string().url(),
  size: z.number(),
  title: z.string(),
  notes: z.string().optional(),
});

export type Log = z.infer<typeof LogSchema>;

export const LogToBeUploadedSchema = LogSchema.extend({
  key: z.string(),
  projectId: z.string().optional(),
});

export type LogToBeUploaded = z.infer<typeof LogToBeUploadedSchema>;

export const LogIdSchema = z.string().brand('LogId');

export type LogId = z.infer<typeof LogIdSchema>;

export const StoredLogSchema = LogSchema.extend({
  id: LogIdSchema,
  createdAt: z.date(),
  projectId: ProjectIdSchema,
});

export type StoredLog = z.infer<typeof StoredLogSchema>;

export const LogFavoriteSchema = z.object({
  favoritedBy: UserIdSchema,
  logId: LogIdSchema,
  createdAt: z.date(),
});

export type LogFavorite = z.infer<typeof LogFavoriteSchema>;
