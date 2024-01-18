import { serial, text, pgTable } from 'drizzle-orm/pg-core';
import { type InferSelectModel, type InferInsertModel } from 'drizzle-orm'
import { profiles, inboundEmails, tenementsSummary } from './schema';

export type ProfilesSelect = InferSelectModel<typeof profiles>
export type ProfilesInsert = InferInsertModel<typeof profiles>

export type InboundEmailsSelect = InferSelectModel<typeof inboundEmails>
export type InboundEmailsInsert = InferInsertModel<typeof inboundEmails>

export type TenementsSummarySelect = InferSelectModel<typeof tenementsSummary>
export type TenementsSummaryInsert = InferInsertModel<typeof tenementsSummary>
