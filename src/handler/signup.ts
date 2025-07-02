import { drizzle } from 'drizzle-orm/node-postgres'
import { users } from '../db/schema';
import { eq } from 'drizzle-orm';
import { handleDiscordResponse } from '../utils/response-handler';

export const signup = async (discordId: string, env: Env) => {
    try{
        let content = "";
        const db = drizzle(env.DB_URL);

        const existingUser = await db.select().from(users).where(eq(users.discordId, discordId));

        if(existingUser.length === 1){
            content = `Hi <@${discordId}>, You already have an account.`;
            return handleDiscordResponse(content, 409);
        }

        content = `Hi <@${discordId}, You have successfully created an account.`;
        await db.insert(users).values({
            discordId,
            updatedAt: Date.now(),
            createdAt: Date.now(),
        })

        return handleDiscordResponse(content, 201);
    }catch(error){
        console.error(`Error while creating user`, error)
        return handleDiscordResponse("Something went wrong! Please try again", 500);
    }
}