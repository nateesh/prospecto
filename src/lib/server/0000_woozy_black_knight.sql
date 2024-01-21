-- Current sql file was generated after introspecting the database
-- If you want to run this migration please uncomment this code before executing migrations
/*
DO $$ BEGIN
 CREATE TYPE "key_status" AS ENUM('default', 'valid', 'invalid', 'expired');
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 CREATE TYPE "key_type" AS ENUM('aead-ietf', 'aead-det', 'hmacsha512', 'hmacsha256', 'auth', 'shorthash', 'generichash', 'kdf', 'secretbox', 'secretstream', 'stream_xchacha20');
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 CREATE TYPE "factor_type" AS ENUM('totp', 'webauthn');
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 CREATE TYPE "factor_status" AS ENUM('unverified', 'verified');
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 CREATE TYPE "aal_level" AS ENUM('aal1', 'aal2', 'aal3');
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 CREATE TYPE "code_challenge_method" AS ENUM('s256', 'plain');
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "profiles" (
	"id" uuid PRIMARY KEY NOT NULL,
	"updated_at" timestamp with time zone,
	"first_name" text,
	"last_name" text,
	"company" text
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "inbound_emails" (
	"id" bigint PRIMARY KEY NOT NULL,
	"created_at" timestamp with time zone DEFAULT now() NOT NULL,
	"from" text,
	"subject" text
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "tenements_summary" (
	"id" bigint NOT NULL,
	"created_at" timestamp with time zone DEFAULT now() NOT NULL,
	"owner" uuid,
	"operator" varchar,
	"tenement" varchar PRIMARY KEY NOT NULL,
	"name" varchar,
	"state" varchar,
	"grant" timestamp with time zone,
	"commencement" timestamp with time zone,
	"expiry" timestamp with time zone,
	"year" smallint,
	"appl_years" smallint,
	"location" varchar,
	"ha" integer,
	"sub_blocks" real,
	"sqkm" real,
	"ea type" varchar,
	"ea_date" timestamp with time zone,
	"rent_p_a" varchar,
	"rent_paid" boolean,
	"security" varchar,
	"enviro_authority" varchar,
	"enviro_fee_p_a" varchar,
	"enviro_fee_paid" boolean,
	"area_km2" smallint,
	"rent_per_sub_block" real
);
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "profiles" ADD CONSTRAINT "profiles_id_fkey" FOREIGN KEY ("id") REFERENCES "auth"."users"("id") ON DELETE cascade ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "tenements_summary" ADD CONSTRAINT "tenements_summary_owner_fkey" FOREIGN KEY ("owner") REFERENCES "public"."profiles"("id") ON DELETE restrict ON UPDATE cascade;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;

*/