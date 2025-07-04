import { handleDiscordResponse } from '../utils/response-handler';
import { createUser, findUser } from '../dao/users';

export const signup = async (discordId: string, env: Env) => {
    try{
        let content = "";
        const {found, user} = await findUser(discordId, env);

        if(found){
            content = `Hi <@${discordId}>, You already have an account.`;
            return handleDiscordResponse(content, 409);
        }

        content = `Hi <@${discordId}, You have successfully created an account.`;
        await createUser(discordId, env);
        
        return handleDiscordResponse(content, 201);
    }catch(error){
        console.error(`(signup): Error while creating user`, error)
        return handleDiscordResponse("Something went wrong! Please try again", 500);
    }
}