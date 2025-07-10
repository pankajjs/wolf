import { drizzle } from "drizzle-orm/node-postgres";
import { CreateTodoDto } from "../dtos/types";
import { todos } from "../db/schema";

export const createTodo = async (todoDto: CreateTodoDto, env: Env) => {
    try{
        const res = await drizzle(env.DB_URL)
            .insert(todos)
            .values({
                title: todoDto.name,
                priority: todoDto.priority,
                description: todoDto.description,
                createdAt: Date.now(),
                updatedAt: Date.now(),
                status: "NOT_STARTED",
                owner: todoDto.owner,
            }).returning();

        return res[0];
    }catch(error){
        console.error(`(dao.createTodo): Error while creating todo`, error);
        throw error;
    }
}