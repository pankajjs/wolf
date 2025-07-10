import { InteractionResponseType } from "discord-interactions";
import { JsonResponse, DiscordResponseArgs } from "../dtos/types";

export const handleDiscordResponse = ({content, type = InteractionResponseType.CHANNEL_MESSAGE_WITH_SOURCE, flag}: DiscordResponseArgs) => {
    return new JsonResponse({
        type,
        data: {
            content,
            flag,
        }
    })
}