import { InteractionResponseFlags } from "discord-interactions"

export class JsonResponse extends Response {
	constructor(body: object, init?: ResponseInit) {
	  const jsonBody = JSON.stringify(body);
	  init = init || {
		headers: {
		  'content-type': 'application/json;charset=UTF-8',
		},
	  };
	  super(jsonBody, init);
	}
}

export class ApiError extends Error {
	constructor(message: string){
		super(message);
	}
}

export type SaveUserArgs = {
    env: Env,
    discordId: string
    appId: string
    token: string
}

export type SaveTodoArgs = {
    appId: string
    token: string,
    env: Env
    todoDto: Omit<CreateTodoDto, "owner">
    discordId: string
}

export type DeleteTodoArgs = {
    id: number
    appId: string
    token: string,
    env: Env,
    discordId: string
}


export type EditTodoDetailsArgs = {
    appId: string,
    token: string,
    env: Env
    editTodoDto: EditTodoDto,
    discordId: string
}

export type GetTodoDetailsArgs = {
    appId: string
    token: string
    discordId: string
    id: number,
    env: Env
}

export type GetAllTodosArgs = {
    discordId: string
    query: GetAllTodosQuery,
    env: Env,
    appId: string
    token: string,
}

export type TodoWithNull = {
    id: number,
    title: string, 
    description: string | null
    priority: Priority | null
    status: Status | null
    progress: number | null,
    createdAt: number,
    updatedAt: number, 
    owner: string
}

export type EditOriginalMessageArgs = {
    appId: string
    token: string
    content: string
} 

export type DiscordResponseArgs = {
    content: string, 
    type?: number,
    flag?: InteractionResponseFlags
}

export type CreateTodoDto = {
    name: string,
    priority: Priority,
    description?: string,
    owner: string
}

export type Priority = "LOW" | "HIGH" | "MEDIUM";
export type Status = "DONE"| "IN_PROGRESS"| "NOT_STARTED"

export type Message = {
    type: number,
    application_id: string,
    token: string,
    id: string,
    data: {
        type: number,
        name: string, 
        options?: {value: string, name: string}[]
    },
    member: {user:{id: string}}
};

export type EditTodoDto = {
    id: number,
    title?: string,
    description?: string,
    priority?: Priority,
    status?: Status,
    progress?: number
}

export type GetAllTodosQuery = {
    priority?: Priority
    status?: Status,
    progress?: number
    sort?: string
    page?: number
    discordId?: string
}