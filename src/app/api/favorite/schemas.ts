import { z } from 'zod';

/**
 * Schema for favorite log toggle requests
 */
export const FavoriteLogSchema = z.object({
  data: z.object({
    logId: z.string({
      required_error: 'Log ID is required',
    }),
  }),
});

/**
 * Schema for favorite project toggle requests
 */
export const FavoriteProjectSchema = z.object({
  data: z.object({
    projectId: z.string({
      required_error: 'Project ID is required',
    }),
  }),
});

/**
 * Type for favorite log toggle request data
 */
export type FavoriteLogData = z.infer<typeof FavoriteLogSchema>;

/**
 * Type for favorite project toggle request data
 */
export type FavoriteProjectData = z.infer<typeof FavoriteProjectSchema>;