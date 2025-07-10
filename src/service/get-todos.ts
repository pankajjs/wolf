import { countAllTodos, findAllTodos } from "../dao";
import { ApiError, GetAllTodosArgs } from "../dtos/types";
import { createTodoTable, editOriginalMessage } from "../utils"

export const getAllTodos = async (args: GetAllTodosArgs) => {
    const {discordId, query, appId, token, env} = args;
    try{    
        const totalCount = await countAllTodos(discordId, env);

        const todos = await findAllTodos({
            discordId,
            ...query
        }, env)
        
        if(todos.length === 0){
            throw new ApiError("Not found any todos");
        }

        const table = createTodoTable(todos);
        const tableHeader = totalCount > 10 ? `**Page ${query.page ?? 1}\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t${10 * (query.page ? query.page - 1 : 0) + 1} - ${todos.length * (query.page ?? 1)} of ${totalCount} Results**` : ``;
        
        return await editOriginalMessage({appId, token, content: `${tableHeader}\n${table}`});
    }catch(error){
        console.error("(service.getAllTodos): Error while fetching todos", error);
        return await editOriginalMessage({appId, token, content: error instanceof ApiError ? error.message :"Something went wrong! Please try again"})
    }
}