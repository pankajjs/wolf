import { drizzle } from "drizzle-orm/node-postgres";
import { GetAllTodosQuery } from "../dtos/types";
import { todos } from "../db/schema";
import { and, asc, desc, eq, gte, inArray, lte } from "drizzle-orm";

export const findAllTodos = async (query: GetAllTodosQuery, env: Env) => {
    try{
        const { discordId, page, priority, progress, sort, status } = query;
        return await drizzle(env.DB_URL)
                .select()
                .from(todos)
                .where(
                    and(
                        priority ? eq(todos.priority, priority): inArray(todos.priority, ["LOW", "HIGH", "MEDIUM"]) ,
                        status ? eq(todos.status, status): inArray(todos.status, ["DONE", "IN_PROGRESS", "NOT_STARTED"]),
                        progress ? lte(todos.progress, progress) : gte(todos.progress, 0),
                        eq(todos.owner, discordId!)
                    )
                )
                .offset(((page ?? 1) - 1) * 10)
                .limit(10) // temporary hardcoded, default value: 10
                .orderBy(
                    sort === "DESC" ? desc(todos.updatedAt) : asc(todos.updatedAt)
                )
    }catch(error){
        console.error(`(dao.findAllTodos): Error while fetching all todos`, error);
        throw error;
    }
}
