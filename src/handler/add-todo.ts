import { createTodo } from "../dao/todos";
import { CreateTodoDto } from "../dtos/todos";
import { handleDiscordResponse } from "../utils/response-handler";

export const addTodo = async (discordId: string, todoDto: CreateTodoDto, env: Env) => {
    try{  
        const { name, priority, description } = todoDto;
        const priorities = ["LOW", "HIGH", "MEDIUM"]
        
        if(name.length > 50 || description && description.length > 100 || !priorities.includes(priority)){
            return handleDiscordResponse({
                content: "Invalid data",
            });
        }

        const todo = await createTodo(discordId, todoDto, env);

        return handleDiscordResponse({
            content: "**Todo created successfully**\n" + `Id: ${todo.id}\nTitle: ${todo.title}\nPriority: ${todo.priority}\nStatus: ${todo.status}\nProgress: ${todo.progress}\nDescription: ${todo.description}`,
        });
    }catch(error){
        console.error(`(addTodo): Error while creating todo`, error);
        return handleDiscordResponse({
            content: "Something went wrong! Please try again",
        });
    }
}