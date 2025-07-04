export type CreateTodoDto = {
    name: string,
    priority: Priority,
    description?: string,
}

export type Priority = "LOW" | "HIGH" | "MEDIUM";
export type Message = {
    type: number,
    data: {
        type: number,
        name: string, 
        options: {value: string}[]
    },
    member: {user:{id: string}}
};