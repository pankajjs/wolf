import { deleteTodoById, findTodoById } from "../dao";
import { ApiError, DeleteTodoArgs } from "../dtos/types";
import { editOriginalMessage } from "../utils";

export const deleteTodo = async (args: DeleteTodoArgs) => {
    const {id, appId, token, env, discordId} = args;
    try{
        const {found, todo} = await findTodoById(id, env);

        if(!found){
            throw new ApiError("Not found any todo");
        }

        if(todo?.owner != discordId){
            throw new ApiError("Not authorized to delete todo");
        }

        await deleteTodoById(id, env);

        return editOriginalMessage({appId, token, content: "Todo deleted."});
    }catch(error){
        console.error(`(service.deleteTodo): Error while deleting todo by id ${id}`, error);
        return await editOriginalMessage({appId, token, content: error instanceof ApiError ? error.message :"Something went wrong! Please try again"})
    }
}