import { drizzle } from "drizzle-orm/node-postgres";
import { todos } from "../db/schema";
import { eq } from "drizzle-orm";

export const deleteTodoById = async (id: number, env: Env) => {
    try{
        await drizzle(env.DB_URL)
            .delete(todos)
            .where(eq(todos.id, id));
    }catch(error){
        console.error(`(dao.deleteTodoById): Error while deleting todo by id:${id}`, error);
        throw error;
    }
}