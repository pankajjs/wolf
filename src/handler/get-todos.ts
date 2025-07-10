import { GetAllTodosQuery, Message, Priority, Status } from "../dtos/types";
import { handleDiscordResponse } from "../utils";
import * as service from "../service"

export const getAllTodos = async (msg:Message, env: Env, ctx: ExecutionContext) => {
    const query: GetAllTodosQuery = {}

    msg.data.options?.forEach(o=>{
        if (o.name === "priority") query.priority = o.value as Priority;
        if (o.name === "status") query.status = o.value as Status;
        if (o.name === "progress") query.progress = Number(o.value);
        if (o.name === "sort") query.sort = o.value;
        if (o.name === "page") query.page = Number(o.value);
    })
    
    ctx.waitUntil(service.getAllTodos({
        appId: msg.application_id,
        token: msg.token,
        discordId: msg.member.user.id,
        env, 
        query,
    }));

    return handleDiscordResponse({
        content: "Request is being processed."
    })
}