import { deleteTodoById, findTodoById } from "../dao/todos";
import { handleDiscordResponse } from "../utils/response-handler";

export const deleteTodo = async (discordId: string, id: number, env: Env) => {
    try{
        const {found, todo} = await findTodoById(id, env);

        if(!found || !todo){
            return handleDiscordResponse({
                content: "Not found any todo", 
            });
        }

        if(todo.owner != discordId){
            return handleDiscordResponse({
                content: "Not authorized to delete task"
            })
        }

        await deleteTodoById(id, env);

        return handleDiscordResponse({
            content: "Todo deleted."
        })
    }catch(error){
        console.error("(deleteTodo): Error while deleting todo with id:", id, error);
        return handleDiscordResponse({
            content: "Something went wrong! Please try again",
        })
    }
}