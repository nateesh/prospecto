import { drizzle } from "drizzle-orm/postgres-js";
import postgres from "postgres";

import { DATABASE_URL, POSTGRES_PASSWORD } from "$env/static/private";
// import * as dotenv from 'dotenv';
// dotenv.config({ path: '.env' });

const firstPart = DATABASE_URL.slice(0, 22);
const secondPart = `${encodeURIComponent(POSTGRES_PASSWORD)}@`
const thirdPart = DATABASE_URL.slice(36,100);

const password = `${firstPart}${secondPart}${thirdPart}`

import * as schema from './schema';

const client = postgres(password);
export const db = drizzle(client, { schema });