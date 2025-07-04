import { handleDiscordResponse } from "../utils/response-handler"

export const hello = (userId: string) => {
    return handleDiscordResponse({
        content: `Hello <@${userId}>, You have executed your first command.`,
    });
}