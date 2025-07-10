import { createTodo } from "../dao";
import { ApiError, SaveTodoArgs } from "../dtos/types";
import { editOriginalMessage } from "../utils";

export const saveTodo = async (args: SaveTodoArgs) => {
    const { discordId, appId, token, env, todoDto } = args;
    try{
        const { name, priority, description } = todoDto;
        const priorities = ["LOW", "HIGH", "MEDIUM"]
        
        if(name.length > 50 || description && description.length > 100 || !priorities.includes(priority)){
            throw new ApiError("Invalid data");
        }

        const todo = await createTodo({
            ...todoDto,
            owner: discordId
        }, env);

        const content = `${"```"}Id: ${todo.id}\nTitle: ${todo.title}\nPriority: ${todo.priority}\nStatus: ${todo.status}\nProgress: ${todo.progress}\nDescription: ${todo.description}${"```"}`;
        return editOriginalMessage({appId, token, content});
    }catch(error){
        console.error("(service.saveTodo): Error while saving todo", error);
        return await editOriginalMessage({appId, token, content: error instanceof ApiError ? error.message :"Something went wrong! Please try again"})
    }
}