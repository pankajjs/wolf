import { editTodoById, findTodoById } from "../dao/todos";
import { EditTodoDto } from "../dtos/todos";
import { handleDiscordResponse } from "../utils/response-handler";

export const editTodo = async (editTodoDto: EditTodoDto, env: Env) => {
    try{
        const {found, todo} = await findTodoById(editTodoDto.id, env);
        
        if(!found || !todo){
            return handleDiscordResponse({
                content: `Todo not found by Id: ${editTodoDto.id}`,
            })
        }

        const editedTodo = await editTodoById({
            ...todo,
            description: editTodoDto.description ?? todo.description!,
            priority: editTodoDto.priority ?? todo.priority!,
            progress: editTodoDto.progress ??  todo.progress!,
            status: editTodoDto.status ?? todo.status!,
            title: editTodoDto.title ?? todo.title
        }, env);

        return handleDiscordResponse({
            content: "**Todo edited successfully**\n" + `Id: ${editedTodo.id}\nTitle: ${editedTodo.title}\nPriority: ${editedTodo.priority}\nStatus: ${editedTodo.status}\nProgress: ${editedTodo.progress}\nDescription: ${editedTodo.description}`,
        });
    }catch(error){
        console.error("(editTodo): Error while editing a todo by id:", error);
        return handleDiscordResponse({
            content: "Something went wrong! Please try again",
        })
    }
}