import { Message } from '../dtos/types';
import { saveUser } from '../service';
import { handleDiscordResponse } from '../utils';

export const signup = async (msg: Message, env: Env, ctx: ExecutionContext) => {
    ctx.waitUntil(saveUser({
        env,
        appId: msg.application_id,
        discordId: msg.member.user.id,
        token: msg.token
    }))

    return handleDiscordResponse({
        content: "Request is being processed",
    });

}