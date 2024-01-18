import { pgTable, pgEnum, uuid, timestamp, text, bigint, foreignKey, primaryKey, varchar, smallint, integer, real, boolean } from "drizzle-orm/pg-core"
  import { sql } from "drizzle-orm"

export const keyStatus = pgEnum("key_status", ['default', 'valid', 'invalid', 'expired'])
export const keyType = pgEnum("key_type", ['aead-ietf', 'aead-det', 'hmacsha512', 'hmacsha256', 'auth', 'shorthash', 'generichash', 'kdf', 'secretbox', 'secretstream', 'stream_xchacha20'])
export const factorType = pgEnum("factor_type", ['totp', 'webauthn'])
export const factorStatus = pgEnum("factor_status", ['unverified', 'verified'])
export const aalLevel = pgEnum("aal_level", ['aal1', 'aal2', 'aal3'])
export const codeChallengeMethod = pgEnum("code_challenge_method", ['s256', 'plain'])


export const profiles = pgTable("profiles", {
	id: uuid("id").primaryKey().notNull(),
	updatedAt: timestamp("updated_at", { withTimezone: true, mode: 'string' }),
	firstName: text("first_name"),
	lastName: text("last_name"),
	company: text("company"),
});

export const inboundEmails = pgTable("inbound_emails", {
	// You can use { mode: "bigint" } if numbers are exceeding js number limitations
	id: bigint("id", { mode: "number" }).primaryKey().notNull(),
	createdAt: timestamp("created_at", { withTimezone: true, mode: 'string' }).defaultNow().notNull(),
	from: text("from"),
	subject: text("subject"),
});

export const tenementsSummary = pgTable("tenements_summary", {
	// You can use { mode: "bigint" } if numbers are exceeding js number limitations
	id: bigint("id", { mode: "number" }).notNull(),
	createdAt: timestamp("created_at", { withTimezone: true, mode: 'string' }).defaultNow().notNull(),
	owner: uuid("owner").references(() => profiles.id, { onDelete: "restrict", onUpdate: "cascade" } ),
	operator: varchar("operator"),
	tenement: varchar("tenement").notNull(),
	name: varchar("name"),
	state: varchar("state"),
	grant: timestamp("grant", { withTimezone: true, mode: 'string' }),
	commencement: timestamp("commencement", { withTimezone: true, mode: 'string' }),
	expiry: timestamp("expiry", { withTimezone: true, mode: 'string' }),
	year: smallint("year"),
	applYears: smallint("appl_years"),
	location: varchar("location"),
	ha: integer("ha"),
	subBlocks: real("sub_blocks"),
	sqkm: real("sqkm"),
	eaType: varchar("ea type"),
	eaDate: timestamp("ea_date", { withTimezone: true, mode: 'string' }),
	rentPA: varchar("rent_p_a"),
	rentPaid: boolean("rent_paid"),
	security: varchar("security"),
	enviroAuthority: varchar("enviro_authority"),
	enviroFeePA: varchar("enviro_fee_p_a"),
	enviroFeePaid: boolean("enviro_fee_paid"),
},
(table) => {
	return {
		tenementsSummaryPkey: primaryKey({ columns: [table.id, table.tenement], name: "tenements_summary_pkey"})
	}
});