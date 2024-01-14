import { drizzle } from "drizzle-orm/postgres-js";
import postgres from "postgres";

import { DATABASE_URL } from "$env/static/private";
// import * as dotenv from 'dotenv';
// dotenv.config({ path: '.env' });

import * as schema from './schema';

const client = postgres(DATABASE_URL);
export const db = drizzle(client, { schema });