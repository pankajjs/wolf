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

import { IRequest, Router} from "itty-router";
import { JsonResponse } from "./dtos/response";
import { baseHandler } from "./handler";
import { verifyDiscordRequest } from "./middleware/verifybot";

const router = Router();

router.get("/healthcheck", (req, env)=>{
	return new JsonResponse({"msg": "Health check ✅"}, {status: 200});
})

router.post("/", async (req: IRequest, env: Env, ctx: ExecutionContext)=>{
	return await baseHandler(req, env, ctx)
})

export default {
	async fetch(request: IRequest, env: any, ctx: ExecutionContext){
		if(request.method == "POST"){
			const isValid = await verifyDiscordRequest(
				request,
				env,
			)
			
			if (!isValid) {
				return new JsonResponse({error: "Unauthorized"}, { status: 401 });
			}
			
			console.info("Request verified successfully");
		}
		return router.fetch(request, env, ctx);
	}
};
