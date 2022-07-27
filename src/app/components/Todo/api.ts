import axios from "axios"
import { TodoItem } from "./todoSlice";

interface jsonplaceholderTodo {
    userId: number;
    id: number;
    title: string;
    completed: boolean;
}

export const getTodos: () => Promise<Array<TodoItem>> = async () => {
    const res = await axios.get<Array<jsonplaceholderTodo>>('https://jsonplaceholder.typicode.com/todos');
    // return res.data.map((t => ({id: t., text: t.title, completed: t.completed}));
    return res.data.map(({id, title, completed}) => ({ id: id.toString(), text: title, completed }));
    // return res.data.map(({userId, title, ...rest}) => ({text: title, ...rest }));
}