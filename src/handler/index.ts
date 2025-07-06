import { InteractionResponseType, InteractionType } from "discord-interactions";
import { IRequest } from "itty-router";
import { JsonResponse } from "../dtos/response";
import { ADD_TODO, DELETE_TODO, EDIT_TODO, HELLO, SIGNUP, TODO, TodoDetails } from "../dtos/commands";
import { hello } from "./hello";
import { signup } from "./signup";
import { addTodo } from "./add-todo";
import { EditTodoDto, GetAllTodosQuery, Message, Priority, Status } from "../dtos/todos";
import { deleteTodo } from "./delete-todo";
import { findUser } from "../dao/users";
import { handleDiscordResponse } from "../utils/response-handler";
import { editTodo } from "./edit-todo";
import { getAllTodos } from "./get-todos";
import { getTodo } from "./todo-details";

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
            return await signup(discordId, env);
        }
        
        const {found} = await findUser(discordId, env);

        if(!found){
            return handleDiscordResponse({
                content: "Please create an account with /signup command", 
            });
        }

        switch(commandName){
            case ADD_TODO.name.toLowerCase():
                return await addTodo(discordId, {
                    name: message.data.options[0].value,
                    priority: message.data.options[1].value as Priority,
                    description: message.data.options.length > 2 ? message.data.options[2].value : ""
                }, env);
            case DELETE_TODO.name.toLowerCase():
                return await deleteTodo(discordId, message.data.options[0].value, env);
            case EDIT_TODO.name.toLowerCase():
                const editTodoDto: EditTodoDto = {id: Number(message.data.options[0].value)};
                message.data.options.forEach((o)=>{
                    if(o.name === "title") editTodoDto.title = o.value;
                    if(o.name === "description") editTodoDto.description = o.value;
                    if(o.name === "priority") editTodoDto.priority = o.value as Priority;
                    if(o.name === "status") editTodoDto.status = o.value as Status;
                    if(o.name === "progress") editTodoDto.progress = Number(o.value);
                })
                return await editTodo(editTodoDto, env);
            case TODO.name.toLowerCase():
                const query: GetAllTodosQuery = {}
                message.data.options?.forEach(o=>{
                    if (o.name === "priority") query.priority = o.value as Priority;
                    if (o.name === "status") query.status = o.value as Status;
                    if (o.name === "progress") query.progress = Number(o.value);
                    if (o.name === "sort") query.sort = o.value;
                    if (o.name === "page") query.page = Number(o.value);
                })
                return await getAllTodos(discordId, query, env);
            case TodoDetails.name.toLowerCase():
                return await getTodo(Number(message.data.options[0].value), env);
            default:
                return new JsonResponse({ error: 'Unknown Type' }, { status: 400 });
        }
    }
	return new JsonResponse({error: "Unknown type"}, {status: 400});
}