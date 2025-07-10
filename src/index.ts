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
import { JsonResponse } from "./dtos/types";
import { baseHandler } from "./handler";
import { verifyDiscordRequest } from "./middleware/verifybot";

const router = Router();

router.get("/healthcheck", (req, env)=>{
	return new JsonResponse({"msg": "Health check ✅"}, {status: 200});
})

router.get("/", (req, env) => {
  const inviteUrl = "https://discord.com/oauth2/authorize?client_id=1391401891967275139";
  const html = `
  <!doctype html>
  <html>
    <head>
      <title>Invite Our Discord Bot</title>
      <style>
        body {
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          background: linear-gradient(135deg, #e0e7ff 0%, #f0fdfa 100%);
          font-family: sans-serif;
		  padding: 200px;
        }
        h1 {
          text-align: center;
          margin-bottom: 24px;
		  font-size: 20px;
        }
        .invite-container {
          display: flex;
          align-items: center;
          gap: 8px;
        }
        input[type="text"] {
          width: 505px;
          padding: 10px;
          font-size: 1rem;
          border-radius: 4px;
          border: 1px solid #ccc;
          background: #eee;
        }
        button {
          padding: 10px 18px;
          font-size: 1rem;
          border-radius: 4px;
          border: none;
          background: #5865F2;
          color: white;
          cursor: pointer;
          transition: background 0.2s;
        }
        button:active {
          background: #404eed;
        }
      </style>
    </head>
    <body>
      <h1>I am wolf, a discord bot to manage your personal todos.</h1>
      <div class="invite-container">
        <input id="inviteUrl" type="text" value="${inviteUrl}" disabled />
        <button id="copyBtn" onclick="copyInvite()">Copy</button>
      </div>
      <script>
        function copyInvite() {
          const input = document.getElementById('inviteUrl');
          const btn = document.getElementById('copyBtn');
          navigator.clipboard.writeText(input.value).then(function() {
            btn.textContent = 'Copied!';
            btn.style.background = '#22c55e'; // Tailwind's green-500
          });
        }
      </script>
    </body>
  </html>
  `;
  return new Response(html, {
    headers: {
      "Content-Type": "text/html"
    }
  });
});

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
