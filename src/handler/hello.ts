import { InteractionResponseType } from "discord-interactions"
import { JsonResponse } from "../utils/dtos"

export const hello = (userId: string) => {
    return new JsonResponse({
        type: InteractionResponseType.CHANNEL_MESSAGE_WITH_SOURCE,
        data : {
            content: `Hello <@${userId}>, You have executed your first command.`
        }
    })
}