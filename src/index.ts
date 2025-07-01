/**
 * Welcome to Cloudflare Workers! This is your first worker.
 *
 * - Run `npm run dev` in your terminal to start a development server
 * - Open a browser tab at http://localhost:8787/ to see your worker in action
 * - Run `npm run deploy` to publish your worker
 *
 * Bind resources to your worker in `wrangler.jsonc`. After adding bindings, a type definition for the
 * `Env` object can be regenerated with `npm run cf-typegen`.
 *
 * Learn more at https://developers.cloudflare.com/workers/
 */

import { verifyKey } from "discord-interactions";
import { IRequest, Router} from "itty-router";
import { JsonResponse } from "./utils/dtos";
import { baseHandler } from "./base-handler";

const router = Router();

router.get("/healthcheck", (req, env)=>{
	return new JsonResponse({"msg": "Health check ✅"}, {status: 200});
})

router.post("/", async (req: IRequest, env: Env, ctx: ExecutionContext)=>{
	return await baseHandler(req, env, ctx)
})

async function verifyDiscordRequest(request: IRequest, env: Env) {
	const signature = request.headers.get('x-signature-ed25519');
	const timestamp = request.headers.get('x-signature-timestamp');
	const body = await request.clone().arrayBuffer();
	
	if(!signature || !timestamp){
		return false;
	}

	return verifyKey(body, signature, timestamp, env.DISCORD_PUBLIC_KEY);
}

export default {
	async fetch(request: IRequest, env: any, ctx: any){
		if(request.method == "POST"){
			const isValid = await verifyDiscordRequest(
				request,
				env,
			)
			
			if (!isValid) {
				return new JsonResponse({error: "BadRequest"}, { status: 401 });
			}
			
			console.info("Request verified successfully");
		}
		return router.fetch(request, env, ctx);
	}
};
