
import { bigserial, pgTable, serial, smallint, varchar } from "drizzle-orm/pg-core";

const timestamps = {
    updatedAt: serial("updated_at"),
    createdAt: serial("created_at").$default(()=>Date.now()).notNull(),
  }

export const users = pgTable("users", {
    id: bigserial({mode: "bigint"}).primaryKey(),
    name: varchar({length: 10}),
    discordId: varchar("discord_id").unique(),
    ...timestamps
})

export const todos = pgTable("todos", {
    id: bigserial({mode: "bigint"}).primaryKey(),
    title: varchar({length: 50}).notNull(),
    description: varchar({length: 100}),
    priority: varchar({enum: ["HIGH", "MEDIUM", "LOW"]}).default("LOW"),
    status: varchar({enum: ["DONE", "IN_PROGRESS", "NOT_STARTED"]}).default("NOT_STARTED"),
    progress: smallint().default(0),
    owner: bigserial("owner", {mode: "bigint"}).references(()=>users.id, {onDelete: "cascade"}).notNull(),
    ...timestamps,
})