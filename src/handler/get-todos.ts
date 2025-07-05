import { drizzle } from "drizzle-orm/node-postgres";
import { GetAllTodosQuery } from "../dtos/todos";
import { handleDiscordResponse } from "../utils/response-handler";
import { todos } from "../db/schema";
import { and, asc, desc, eq, gte, inArray, lte, } from "drizzle-orm";
import { createTodoTable } from "../utils/helper";

export const getAllTodos = async (query: GetAllTodosQuery, env: Env) => {
    try{
        const todosRes = await drizzle(env.DB_URL)
                .select()
                .from(todos)
                .where(
                    and(
                        query.priority ? eq(todos.priority, query.priority): inArray(todos.priority, ["LOW", "HIGH", "MEDIUM"]) ,
                        query.status ? eq(todos.status, query.status): inArray(todos.status, ["DONE", "IN_PROGRESS", "NOT_STARTED"]),
                        query.progress ? lte(todos.progress, query.progress) : gte(todos.progress, 0), 
                    )
                )
                .orderBy(
                    query.sort === "DESC" ? desc(todos.updatedAt) : asc(todos.updatedAt)
                )

        if(todosRes.length === 0){
            return handleDiscordResponse({
                content: "Not found any todos",
            })
        }

        const table = createTodoTable(todosRes);

        return handleDiscordResponse({
            content: table
        })
    }catch(error){
        console.error("(getAllTodos): Error while fetching todos", error);
        return handleDiscordResponse({
            content: "Something went wrong! Please try again",
        })
    }
}