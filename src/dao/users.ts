import { drizzle } from "drizzle-orm/node-postgres";
import { users } from "../db/schema";
import { eq } from "drizzle-orm";

export const findUser = async (discordId: string, env: Env) => {
    try{

        const db = drizzle(env.DB_URL);

        const res = await db.select().from(users).where(eq(users.discordId, discordId));
        
        if(res.length == 1){
            return {
                found: true,
                user: res[0],
            }
        }

        return {
            found: false,
            user: null
        }
    }catch(error){
        console.error(`(findUser): Error while fetching user by discordId`, error);
        throw error;
    }
}

export const createUser = async (discordId: string, env: Env) => {
    try{
        const db = drizzle(env.DB_URL);
    
        const res = await db.insert(users).values({
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