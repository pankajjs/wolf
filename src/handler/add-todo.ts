import { createTodo } from "../dao/todos";
import { findUser } from "../dao/users";
import { CreateTodoDto } from "../dtos/todos";
import { handleDiscordResponse } from "../utils/response-handler";

export const addTodo = async (discordId: string, todo: CreateTodoDto, env: Env) => {
    try{
        
        const {found} = await findUser(discordId, env);

        if(!found){
            return handleDiscordResponse({
                content: "Please create an account with /signup command", 
            });
        }

        const { name, priority, description } = todo;
        const priorities = ["LOW", "HIGH", "MEDIUM"]
        
        if(name.length > 50 || description && description.length > 100 || !priorities.includes(priority)){
            return handleDiscordResponse({
                content: "Invalid data",
            });
        }

        await createTodo(discordId, todo, env);

        return handleDiscordResponse({
                content: "Created a todo successfully",
        });
    }catch(error){
        console.error(`(addTodo): Error while creating todo`, error);
       return handleDiscordResponse({
            content: "Something went wrong! Please try again",
        });
    }
}