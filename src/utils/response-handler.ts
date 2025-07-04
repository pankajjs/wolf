import { InteractionResponseFlags, InteractionResponseType } from "discord-interactions";
import { JsonResponse } from "../dtos/response";

type ResponseArgs = {
    content: string, 
    type?: number,
    flag?: InteractionResponseFlags
}

export const handleDiscordResponse = ({content, type = InteractionResponseType.CHANNEL_MESSAGE_WITH_SOURCE, flag}: ResponseArgs) => {
    return new JsonResponse({
        type,
        data: {
            content,
            flag,
        }
    })
}