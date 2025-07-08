import { drizzle } from "drizzle-orm/node-postgres";
import { GetAllTodosQuery } from "../dtos/todos";
import { handleDiscordResponse } from "../utils/response-handler";
import { todos } from "../db/schema";
import { and, asc, count, desc, eq, gte, inArray, lte, } from "drizzle-orm";
import { createTodoTable } from "../utils/helper";

export const getAllTodos = async (discordId: string, query: GetAllTodosQuery, env: Env) => {
    try{
        const db = drizzle(env.DB_URL);
        
        const totalCount = (await db.select({count:count()}).from(todos).where(eq(todos.owner, discordId)))[0].count;

        const todosRes = await db
                .select()
                .from(todos)
                .where(
                    and(
                        query.priority ? eq(todos.priority, query.priority): inArray(todos.priority, ["LOW", "HIGH", "MEDIUM"]) ,
                        query.status ? eq(todos.status, query.status): inArray(todos.status, ["DONE", "IN_PROGRESS", "NOT_STARTED"]),
                        query.progress ? lte(todos.progress, query.progress) : gte(todos.progress, 0),
                        eq(todos.owner, discordId)
                    )
                )
                .offset(((query.page ?? 1) - 1) * 10)
                .limit(10) // temporary hardcoded, default value: 10
                .orderBy(
                    query.sort === "DESC" ? desc(todos.updatedAt) : asc(todos.updatedAt)
                )

        if(todosRes.length === 0){
            return handleDiscordResponse({
                content: "Not found any todos",
            })
        }

        const table = createTodoTable(todosRes);

        const tableHeader = totalCount > 10 ? `**Page ${query.page ?? 1}\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t${10 * (query.page ? query.page - 1 : 0) + 1} - ${todosRes.length * (query.page ?? 1)} of ${totalCount} Results**` : ``

        return handleDiscordResponse({
            content: `${tableHeader}\n${table}`
        })
    }catch(error){
        console.error("(getAllTodos): Error while fetching todos", error);
        return handleDiscordResponse({
            content: "Something went wrong! Please try again",
        })
    }
}