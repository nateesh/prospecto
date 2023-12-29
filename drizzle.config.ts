import type { Config } from "drizzle-kit";
//from .env.local file
import * as dotenv from 'dotenv';
dotenv.config({ path: '.env' });

export default {
  schema: "./src/schema/*",
  out: "./src/lib/server",
  driver: 'pg',
  dbCredentials: {
    connectionString: `${process.env.DATABASE_URL}`,	
  }
  
} satisfies Config;