import { count, eq } from "drizzle-orm";
import { drizzle } from "drizzle-orm/node-postgres";
import { todos } from "../db/schema";

export const countAllTodos = async (discordId: string, env: Env) => {
    try{
        return (await drizzle(env.DB_URL)
                .select({count:count()})
                .from(todos)
                .where(eq(todos.owner, discordId)))[0].count;
    }catch(error){
        console.error(`(dao.countAllTodos): Error while counting all todos`, error);
        throw error;
    }
}