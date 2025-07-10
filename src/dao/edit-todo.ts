import { drizzle } from "drizzle-orm/node-postgres";
import { EditTodoDto } from "../dtos/types";
import { todos } from "../db/schema";
import { eq } from "drizzle-orm";

export const editTodoById = async(editTodoDto: EditTodoDto, env: Env) => {
    try{
        return (await drizzle(env.DB_URL)
                .update(todos)
                .set({
                    description: editTodoDto.description,
                    priority: editTodoDto.priority,
                    progress: editTodoDto.progress,
                    status: editTodoDto.status,
                    title: editTodoDto.title,
                    updatedAt: Date.now(),
                })
                .where(eq(todos.id, editTodoDto.id))
                .returning())[0];
    }catch(error){
        console.error(`(dao.editTodoById): Error while editing todo by id: ${editTodoDto.id}`, error);
        throw error;
    }
}