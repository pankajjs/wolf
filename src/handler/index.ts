import { InteractionResponseType, InteractionType } from "discord-interactions";
import { IRequest } from "itty-router";
import { JsonResponse, Message } from "../dtos/types";
import { ADD_TODO, DELETE_TODO, EDIT_TODO, HELLO, HELP, SIGNUP, TODO, TODO_DETAILS } from "../dtos/commands";
import { hello } from "./hello";
import { signup } from "./signup";
import { addTodo } from "./add-todo";
import { deleteTodo } from "./delete-todo";
import { handleDiscordResponse } from "../utils";
import { editTodo } from "./edit-todo";
import { getAllTodos } from "./get-todos";
import { getTodo } from "./todo-details";
import { findUser } from "../dao";

export const baseHandler = async (req: IRequest, env: Env, ctx: ExecutionContext) => {
    const message = await req.json() as Message;

    if(message.type === InteractionType.PING){
		return new JsonResponse(
			{
			type : InteractionResponseType.PONG
		}, {status: 200});
	}
    
    const discordId = message.member.user.id;

    if(message.type === InteractionType.APPLICATION_COMMAND){
        const commandName = message.data.name.toLowerCase();
        if(commandName === HELLO.name.toLowerCase()){
            return hello(discordId);
        }else if(commandName === SIGNUP.name.toLowerCase()){
            return await signup(message, env, ctx);
        }else if(commandName === HELP.name.toLowerCase()){
            return handleDiscordResponse({
                content:"```" + 
            "| Command        | Description\n" +
            "|----------------|-----------------------------\n" +
            "| `/hello`       | Get a welcome message\n" +
            "| `/signup`      | Create an account\n" +
            "| `/add-todo`    | Create a new todo\n" +
            "| `/edit-todo`   | Edit an existing todo\n" +
            "| `/delete-todo` | Delete a todo\n" +
            "| `/todos`       | List all todos with filters\n" +
            "| `/todo-detail` | View a specific todo\n" +
            "```"
            })
        }
        
        const {found} = await findUser(discordId, env);

        if(!found){
            return handleDiscordResponse({
                content: "Please create an account with /signup command", 
            });
        }

        switch(commandName){
            case ADD_TODO.name.toLowerCase():
                return await addTodo(message, env, ctx);
            case DELETE_TODO.name.toLowerCase():
                return await deleteTodo(message, env, ctx);
            case EDIT_TODO.name.toLowerCase():
                return await editTodo(message, env, ctx);
            case TODO.name.toLowerCase():
                return await getAllTodos(message, env, ctx);
            case TODO_DETAILS.name.toLowerCase():
                return await getTodo(message, env, ctx);
            default:
                return new JsonResponse({ error: 'Unknown Type' }, { status: 400 });
        }
    }
	return new JsonResponse({error: "Unknown type"}, {status: 400});
}