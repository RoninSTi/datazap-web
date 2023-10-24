import dotenv from 'dotenv';
import type { Config } from 'drizzle-kit';

dotenv.config({ path: '.env.local', override: true });
dotenv.config();

/** @type {import('drizzle-kit').Config} */
export default {
  out: './migrations',
  schema: './src/models/schema.ts',
  driver: 'mysql2',
  dbCredentials: {
    connectionString: process.env.DATABASE_URL ?? '',
  },
} satisfies Config;
