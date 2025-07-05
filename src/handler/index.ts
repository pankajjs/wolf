import { InteractionResponseType, InteractionType } from "discord-interactions";
import { IRequest } from "itty-router";
import { JsonResponse } from "../dtos/response";
import { ADD_TODO, DELETE_TODO, HELLO, SIGNUP } from "../dtos/commands";
import { hello } from "./hello";
import { signup } from "./signup";
import { addTodo } from "./add-todo";
import { Message, Priority } from "../dtos/todos";
import { deleteTodo } from "./delete-todo";

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
        switch(message.data.name.toLowerCase()){
            case HELLO.name.toLowerCase():
                return hello(discordId);
            case SIGNUP.name.toLowerCase():
               return await signup(discordId, env);
            case ADD_TODO.name.toLowerCase():
                return await addTodo(discordId, {
                    name: message.data.options[0].value,
                    priority: message.data.options[1].value as Priority,
                    description: message.data.options.length > 2 ? message.data.options[2].value : ""
                }, env);
            case DELETE_TODO.name.toLowerCase():
                return await deleteTodo(discordId, message.data.options[0].value, env);
            default:
                return new JsonResponse({ error: 'Unknown Type' }, { status: 400 });
        }
    }
	return new JsonResponse({error: "Unknown type"}, {status: 400});
}