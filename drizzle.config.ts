import type { Config } from "drizzle-kit";
//from .env.local file
import * as dotenv from 'dotenv';
dotenv.config({ path: '.env' });

export default {
  schema: "./src/lib/server/schema.ts",
  out: "./src/lib/server/",
  driver: 'pg',
  dbCredentials: {
    connectionString: `${process.env.DATABASE_URL}`,	
  }
  
} satisfies Config;