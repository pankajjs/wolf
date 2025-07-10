import { editTodoById, findTodoById } from "../dao"
import { ApiError, EditTodoDetailsArgs } from "../dtos/types";
import { editOriginalMessage } from "../utils"

export const editTodoDetails = async (args: EditTodoDetailsArgs) => {
    const { env, editTodoDto, discordId, appId, token } = args;
    try{
        const {found, todo} = await findTodoById(editTodoDto.id, env);
        
        if(!found){
            throw new ApiError(`Not found any todo`)
        }

        if(todo?.owner != discordId){
            throw new ApiError("Not authorised to edit todo");
        }

        const editedTodo = await editTodoById({
            ...todo,
            description: editTodoDto.description ?? todo.description!,
            priority: editTodoDto.priority ?? todo.priority!,
            progress: editTodoDto.progress ??  todo.progress!,
            status: editTodoDto.status ?? todo.status!,
            title: editTodoDto.title ?? todo.title
        }, env);

        const content = `${"```"}Id: ${editedTodo.id}\nTitle: ${editedTodo.title}\nPriority: ${editedTodo.priority}\nStatus: ${editedTodo.status}\nProgress: ${editedTodo.progress}\nDescription: ${editedTodo.description}${"```"}`;
        
        return editOriginalMessage({
            appId,
            token,
            content,
        })
    }catch(error){
        console.error(`(service.editTodoDetails): Error while editing todo by id ${editTodoDto.id}`, error);
        return await editOriginalMessage({appId, token, content: error instanceof ApiError ? error.message :"Something went wrong! Please try again"})
    }
}