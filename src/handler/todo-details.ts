import { drizzle } from "drizzle-orm/node-postgres";
import { handleDiscordResponse } from "../utils/response-handler";
import { todos } from "../db/schema";
import { eq } from "drizzle-orm";

export const getTodo = async (id: number, env: Env) => {
    try{
        const res = await drizzle(env.DB_URL).select().from(todos).where(eq(todos.id, id));
        
        if(res.length == 0){
            return handleDiscordResponse({
                content: "Not found any todo by id: " + id
            })
        }
        const todo = res[0];
        return handleDiscordResponse({
            content:  "**Fetched todo successfully**\n" + `Id: ${todo.id}\nTitle: ${todo.title}\nPriority: ${todo.priority}\nStatus: ${todo.status}\nProgress: ${todo.progress}\nDescription: ${todo.description}`,
        })
    }catch(error){
        console.error(`(getTodo): Error while fetching todo by id: `, id, error);
        return handleDiscordResponse({
            content: "Something went wrong! Please try again",
        })
    }
}