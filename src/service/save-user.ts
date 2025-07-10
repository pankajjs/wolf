import { createUser, findUser } from "../dao";
import { ApiError, SaveUserArgs } from "../dtos/types";
import { editOriginalMessage } from "../utils";

export const saveUser = async ({env, discordId, appId, token}: SaveUserArgs)=>{
    try{
        const { found } = await findUser(discordId, env);
        
        if(found){
            throw new ApiError(`Hi <@${discordId}>, You already have an account.`);
        }
        
        await createUser(discordId, env);
        
        return editOriginalMessage({
            appId, 
            token, 
            content: `Hi <@${discordId}, You have successfully created an account.`
        });
    }catch(error){
        console.error(`(service.createUser): Error while creating user`, error);
        return await editOriginalMessage({appId, token, content: error instanceof ApiError ? error.message :"Something went wrong! Please try again"}) 
    }
}