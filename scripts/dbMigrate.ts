/* eslint-disable no-console */
import { connect } from '@planetscale/database';
import dotenv from 'dotenv';
import { drizzle } from 'drizzle-orm/planetscale-serverless';
import { migrate } from 'drizzle-orm/planetscale-serverless/migrator';

dotenv.config({ path: '.env.local', override: true });
dotenv.config();

async function main() {
  console.log('Migration started');

  const connection = connect({
    host: process.env.DATABASE_HOST,
    username: process.env.DATABASE_USERNAME,
    password: process.env.DATABASE_PASSWORD,
  });

  const db = drizzle(connection);

  await migrate(db, { migrationsFolder: './migrations' });

  console.log('Migration completed');

  process.exit(0);
}

main().catch((error) => {
  console.error('Migration failed');
  console.log(error);
  process.exit(1);
});
