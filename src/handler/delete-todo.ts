import { Message } from "../dtos/types";
import { handleDiscordResponse } from "../utils";
import * as service from "../service";

export const deleteTodo = async (msg: Message, env: Env, ctx: ExecutionContext) => {

    ctx.waitUntil(service.deleteTodo({
        appId: msg.application_id,
        token: msg.token,
        discordId: msg.member.user.id,
        env,
        id: Number(msg.data.options?.[0].value)
    }))

    return handleDiscordResponse({
        content: "Request is being processed"
    })
}