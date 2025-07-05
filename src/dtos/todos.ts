export type CreateTodoDto = {
    name: string,
    priority: Priority,
    description?: string,
}

export type Priority = "LOW" | "HIGH" | "MEDIUM";
export type Status = "DONE"| "IN_PROGRESS"| "NOT_STARTED"

export type Message = {
    type: number,
    data: {
        type: number,
        name: string, 
        options: {value: string, name: string}[]
    },
    member: {user:{id: string}}
};

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
}