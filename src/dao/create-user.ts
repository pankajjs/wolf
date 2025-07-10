import { drizzle } from "drizzle-orm/node-postgres";
import { users } from "../db/schema";

export const createUser = async (discordId: string, env: Env) => {
    try{
        const res = await drizzle(env.DB_URL).insert(users).values({
            discordId,
            updatedAt: Date.now(),
            createdAt: Date.now(),
        }).returning()
        
        return res[0];
    }catch(error){
        console.error(`(createUser): Error while creating user`, error);
        throw error;
    }
}