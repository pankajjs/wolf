import { TodoWithNull } from "../dtos/types";

export const createTodoTable = (todos: TodoWithNull[]) => {
    let table = "Id        | Priority | Status       | Progress(%) | Title \n";
    table += "----------|----------|--------------|-------------|----------\n";
    for (const todo of todos) {
        let title = todo.title;
        if(title.length > 20){
            title = title.slice(0, 20) + "...."
        }
        table += `${todo.id.toString().padEnd(10)}| ${(todo.priority!).padEnd(9)}| ${(todo.status!).padEnd(13)}| ${todo.progress!.toString().padEnd(11)} | ${title}\n`;
    }
    return "```" + table + "```";
}