import { Message, Priority } from "../dtos/types";
import { saveTodo } from "../service";
import { handleDiscordResponse } from "../utils";

export const addTodo = async (msg: Message, env: Env, ctx: ExecutionContext) => {
    
    ctx.waitUntil(saveTodo({
        appId: msg.application_id,
        token: msg.token,
        env,
        discordId: msg.member.user.id,
        todoDto: {
            name: msg.data.options?.[0].value!,
            priority: msg.data.options?.[1].value as Priority,
            description: msg.data.options?.length! > 2 ? msg?.data.options?.[2].value : ""
        }
    }))
    
    return handleDiscordResponse({
        content: "Request is being processed"
    });
}