// ===============================================================
// schema.ts — Durable links, visibility, and atomic visit totals.
// ===============================================================
import { sqliteTable, text, integer, check } from 'drizzle-orm/sqlite-core';
import { sql } from 'drizzle-orm';
export const links = sqliteTable('links', {
 id:text('id').primaryKey(), title:text('title').notNull(), url:text('url').notNull(),
 description:text('description').notNull().default(''), public:integer('public').notNull().default(0),
 clicks:integer('clicks').notNull().default(0), position:integer('position').notNull().default(100)
},t=>[check('visibility_boolean',sql`${t.public} IN (0,1)`),check('clicks_nonnegative',sql`${t.clicks} >= 0`)]);
