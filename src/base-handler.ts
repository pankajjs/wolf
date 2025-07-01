import { InteractionResponseType, InteractionType } from "discord-interactions";
import { IRequest } from "itty-router";
import { JsonResponse } from "./utils/dtos";
import { HELLO } from "./commands";

export const baseHandler = async (req: IRequest, env: Env, ctx: ExecutionContext) => {
    const interaction = await req.json() as any;

    if(interaction.type === InteractionType.PING){
		return new JsonResponse(
			{
			type : InteractionResponseType.PONG
		}, {status: 200});
	}

    if(interaction.type === InteractionType.APPLICATION_COMMAND){
        switch(interaction.data.name.toLowerCase()){
            case HELLO.name.toLowerCase(): {
                return new JsonResponse({
                    type: InteractionResponseType.CHANNEL_MESSAGE_WITH_SOURCE,
                    data : {
                        content: `Hello <@${interaction.member.user.id}>, You have executed your first command.`
                    }
                })
            }
            default:
                return new JsonResponse({ error: 'Unknown Type' }, { status: 400 });
        }
    }
	return new JsonResponse({error: "Unknown type"}, {status: 400});
}