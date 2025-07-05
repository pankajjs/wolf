import { drizzle } from "drizzle-orm/node-postgres";
import { CreateTodoDto } from "../dtos/todos";
import { todos } from "../db/schema";
import { eq } from "drizzle-orm";

export const createTodo = async (discordId: string, todoDto: CreateTodoDto, env: Env) => {
    try{
        const db = drizzle(env.DB_URL);

        const res = await db.insert(todos).values({
            title: todoDto.name,
            priority: todoDto.priority,
            description: todoDto.description,
            createdAt: Date.now(),
            updatedAt: Date.now(),
            status: "NOT_STARTED",
            owner: discordId,
        }).returning();

        return res[0];
    }catch(error){
        console.error(`(createTodo): Error while creating todo`, error);
        throw error;
    }
}

export const deleteTodoById = async (id: number, env: Env) => {
    try{
        await drizzle(env.DB_URL).delete(todos).where(eq(todos.id, id));
    }catch(error){
        console.error(`(deleteTodoById): Error while deleting todo by id:${id}`, error);
        throw error;
    }
}