import React, { useEffect, useRef } from "react";
import { useAppDispatch, useAppSelector } from "../../hooks";
import { getTodos } from "./api";
import todoSlice, { addTodo, getTodosThunk, getTodosThunkAsync, TodoItem, toggleCompleted } from "./todoSlice";


export const TodoList: React.FC = () => {
    const {todos, error, loading} = useAppSelector(s => s.todo);
    const dispach = useAppDispatch();
    const ref = useRef<HTMLInputElement>(null);

    const toggle = (todo: TodoItem) => {
        dispach(toggleCompleted(todo));
    }

    const add = () => {
        const value = ref.current?.value;
        if(value) {
            dispach(addTodo(value));
        }
    }

    useEffect(() => {
        dispach(getTodosThunkAsync()).then(() => {
            // alert('ho scaricato i dati');
        })
    }, []);

    if(error) {
        return <h1>{error}</h1>
    }

    if(loading) {
        return <h1>loading...</h1>
    }

    return (
        <>
            <div>
                <input type="text" ref={ref}/>
                <button onClick={add}>add</button>
            </div>
            <ul>
                {todos.map(t => <TodoListItem todo={t} toggleCompleted={() => toggle(t)} key={t.id}/>)}
            </ul>
        </>
    );
}

interface TodoListItemProps {
    todo: TodoItem,
    toggleCompleted: () => void
}

const TodoListItem: React.FC<TodoListItemProps> = ({todo, toggleCompleted}) => {
    return (
        <li>
            <span style={{textDecoration: todo.completed ? 'line-through' : ''}}>{todo.text}</span>
            <button onClick={toggleCompleted}>X</button>
        </li>
    );
}