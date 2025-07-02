import { InteractionResponseType, InteractionType } from "discord-interactions";
import { IRequest } from "itty-router";
import { JsonResponse } from "../dtos/response";
import { HELLO, SIGNUP } from "../dtos/commands";
import { hello } from "./hello";
import { signup } from "./signup";

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
            case HELLO.name.toLowerCase():
                return hello(interaction.member.user.id);
            case SIGNUP.name.toLowerCase():
               return signup(interaction.member.user.id, env);
            default:
                return new JsonResponse({ error: 'Unknown Type' }, { status: 400 });
        }
    }
	return new JsonResponse({error: "Unknown type"}, {status: 400});
}