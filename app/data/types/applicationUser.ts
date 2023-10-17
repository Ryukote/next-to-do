import { ToDoItem } from "./todo/todoItem";

export type ApplicationUser = {
    name: string;
    todoItems?: ToDoItem[];
}
