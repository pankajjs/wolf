import { findTodoById } from "../dao";
import { ApiError, GetTodoDetailsArgs } from "../dtos/types";
import { editOriginalMessage } from "../utils";

export const getTodoDetails = async (args: GetTodoDetailsArgs) => {
    const { appId, token, id, discordId, env } = args;
    try{
        const {found, todo} = await findTodoById(id, env);

        if((todo && todo.owner != discordId) || !found){
            throw new ApiError("Not found any todo");
        }
        const content = `${"```"}Id: ${todo?.id}\nTitle: ${todo?.title}\nPriority: ${todo?.priority}\nStatus: ${todo?.status}\nProgress: ${todo?.progress}\nDescription: ${todo?.description}${"```"}`
        
        return editOriginalMessage({
            appId,
            token,
            content,
        })
    }catch(error){
        console.error("(service.getTodoDetails): Error while fetching todos", error);
        return await editOriginalMessage({appId, token, content: error instanceof ApiError ? error.message :"Something went wrong! Please try again"})
    }
}