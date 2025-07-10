import { handleDiscordResponse } from "../utils";
import { Message } from "../dtos/types";
import { getTodoDetails } from "../service";

export const getTodo = async (msg: Message, env: Env, ctx: ExecutionContext) => {
    
    ctx.waitUntil(getTodoDetails({
        appId: msg.application_id,
        token: msg.token,
        discordId: msg.member.user.id,
        env,
        id: Number(msg.data.options?.[0].value)
    }));

    return handleDiscordResponse({
        content: "Request is being processed."
    })
}

