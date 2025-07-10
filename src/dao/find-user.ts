import { drizzle } from "drizzle-orm/node-postgres";
import { users } from "../db/schema";
import { eq } from "drizzle-orm";

export const findUser = async (discordId: string, env: Env) => {
    try{
        const res = await drizzle(env.DB_URL)
                    .select()
                    .from(users)
                    .where(eq(users.discordId, discordId));
        
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
        console.error(`(dao.findUser): Error while fetching user by discordId`, error);
        throw error;
    }
}
