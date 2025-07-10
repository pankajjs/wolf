import { EditTodoDto, Message, Priority, Status } from "../dtos/types";
import { editTodoDetails } from "../service";
import { handleDiscordResponse } from "../utils";

export const editTodo = async (msg: Message, env: Env, ctx: ExecutionContext) => {
    
    const editTodoDto: EditTodoDto = {id: Number(msg.data.options?.[0].value)};
    msg.data.options?.forEach((o)=>{
        if(o.name === "title") editTodoDto.title = o.value;
        if(o.name === "description") editTodoDto.description = o.value;
        if(o.name === "priority") editTodoDto.priority = o.value as Priority;
        if(o.name === "status") editTodoDto.status = o.value as Status;
        if(o.name === "progress") editTodoDto.progress = Number(o.value);
    })
    
    ctx.waitUntil(editTodoDetails({
        appId: msg.application_id,
        discordId: msg.member.user.id,
        env,
        token: msg.token,
        editTodoDto,
    }));
    
    return handleDiscordResponse({
        content: "Request is being processed."
    })
}