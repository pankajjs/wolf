import { drizzle } from "drizzle-orm/node-postgres";
import { CreateTodoDto, EditTodoDto } from "../dtos/todos";
import { todos } from "../db/schema";
import { eq } from "drizzle-orm";

export const createTodo = async (discordId: string, todoDto: CreateTodoDto, env: Env) => {
    try{
        const res = await drizzle(env.DB_URL).insert(todos).values({
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

export const findTodoById = async (id: number, env: Env) => {
    try{
        const res = await drizzle(env.DB_URL).select().from(todos).where(eq(todos.id, id));
        if(res.length != 1){
            return {found: false, todo: null};
        }
        return {found: true, todo: res[0]};
    }catch(error){  
        console.error(`(findTodoById): Error while fetching todo by id: ${id}`, error);
        throw error;
    }
}

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
        console.error(`(editTodoById): Error while editing todo by id: ${editTodoDto.id}`, error);
        throw error;
    }
}