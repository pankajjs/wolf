import { TodoWithNull } from "../dtos/todos";

export const createTodoTable = (todos: TodoWithNull[]) => {
    let table = "Title           | Priority";
    table += "----------------|---------\n";
    for (const todo of todos) {
        table += `${todo.title.padEnd(15)}| ${todo.priority}\n`;
    }
    return table;
}