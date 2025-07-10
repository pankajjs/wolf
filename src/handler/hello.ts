import { handleDiscordResponse } from "../utils"

export const hello = (userId: string) => {
    return handleDiscordResponse({
        content: `Hello <@${userId}>, You have executed your first command.`,
    });
}