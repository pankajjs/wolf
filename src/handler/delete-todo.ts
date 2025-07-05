import { deleteTodoById } from "../dao/todos";
import { findUser } from "../dao/users";
import { handleDiscordResponse } from "../utils/response-handler";

export const deleteTodo = async (discordId: string, id: string, env: Env) => {
    try{
        const {found} = await findUser(discordId, env);

        if(!found){
            return handleDiscordResponse({
                content: "Please create an account with /signup command", 
            });
        }

        await deleteTodoById(Number(id), env);
        return handleDiscordResponse({
            content: "Deleted todo successfully."
        })
    }catch(error){
        console.error("(deleteTodo): Error while deleting todo with id:", id, error);
        return handleDiscordResponse({
            content: "Something went wrong! Please try again",
        })
    }
}