import { drizzle } from "drizzle-orm/node-postgres";
import { todos } from "../db/schema";
import { eq } from "drizzle-orm";

export const findTodoById = async (id: number, env: Env) => {
    try{
        const res = await drizzle(env.DB_URL)
                .select()
                .from(todos)
                .where(eq(todos.id, id));
        
        if(res.length != 1){
            return {found: false, todo: null};
        }
        return {found: true, todo: res[0]};
    }catch(error){  
        console.error(`(dao.findTodoById): Error while fetching todo by id: ${id}`, error);
        throw error;
    }
}