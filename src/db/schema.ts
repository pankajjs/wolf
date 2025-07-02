
import { bigserial, integer, pgTable, serial, smallint, varchar } from "drizzle-orm/pg-core";

const timestamps = {
    updatedAt: bigserial("updated_at", {mode: "number"}),
    createdAt: bigserial("created_at", {mode: "number"}).$default(()=>Date.now()).notNull(),
  }

export const users = pgTable("users", {
    discordId: varchar("discord_id").primaryKey(),
    ...timestamps
})

export const todos = pgTable("todos", {
    id: integer().primaryKey(),
    title: varchar({length: 50}).notNull(),
    description: varchar({length: 100}),
    priority: varchar({enum: ["HIGH", "MEDIUM", "LOW"]}).default("LOW"),
    status: varchar({enum: ["DONE", "IN_PROGRESS", "NOT_STARTED"]}).default("NOT_STARTED"),
    progress: smallint().default(0),
    owner: varchar("owner").references(()=>users.discordId, {onDelete: "cascade"}).notNull(),
    ...timestamps,
})