import { InteractionResponseFlags, InteractionResponseType } from "discord-interactions";
import { JsonResponse } from "../dtos/response";

export const handleDiscordResponse = (content: string, status: number, flag?: InteractionResponseFlags) => {
    return new JsonResponse({
        type: InteractionResponseType.CHANNEL_MESSAGE_WITH_SOURCE,
        data: {
            content,
            flag,
        }
    }, {status})
}