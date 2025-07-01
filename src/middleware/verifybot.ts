import { verifyKey } from "discord-interactions";
import { IRequest } from "itty-router";
import { JsonResponse } from "../utils/dtos";

export const verifyDiscordRequest = async (request: IRequest, env: Env) => {
    try{

        const signature = request.headers.get('x-signature-ed25519');
        const timestamp = request.headers.get('x-signature-timestamp');
        const body = await request.clone().arrayBuffer();
        
        if(!signature || !timestamp){
            return false;
        }

        return verifyKey(body, signature, timestamp, env.DISCORD_PUBLIC_KEY);
    }catch(error){
        console.error( `Error while verify discord request`, error);
        return new JsonResponse({
            error: "Unauthorized"
        }, {status: 401})
    }
}