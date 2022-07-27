import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { AppThunk } from "../../store";
import { getTodos } from "./api";

export interface TodoItem
{
    id: string;
    text: string;
    completed: boolean;
}


interface TodoState {
    loading: boolean;
    error?: string;
    todos: Array<TodoItem>
}

const initialState: TodoState = {
    loading: false,
    todos: [
        // {
        //     id: '1',
        //     text: 'fare la spesa',
        //     completed: false
        // },
        // {
        //     id: '2',
        //     text: 'studiare react',
        //     completed: true
        // },
    ]
}


const todoSlice = createSlice({
    name: 'todo',
    initialState,
    reducers: {
        loadTodos: (state: TodoState) => {
            state.loading = true;
        }, 
        loadTodosSuccess: (state: TodoState, {payload: todos}: PayloadAction<Array<TodoItem>>) => {
            state.todos = todos;
            state.loading = false;
        },
        loadTodosError: (state: TodoState, {payload: error}: PayloadAction<string>) => {
            state.todos = [];
            state.error = error;
            state.loading = false;
        },
        toggleCompleted: (state: TodoState, {payload: todo}: PayloadAction<TodoItem>) => {
            console.log('toggleCompleted', todo);
            const index = state.todos.findIndex(t => t.id === todo.id);
            state.todos[index].completed = !state.todos[index].completed;
        },
        addTodo: (state: TodoState, {payload: text}: PayloadAction<string>) => {
            const newTodo: TodoItem = {
                id: Math.round(Math.random() * 1000).toString(),
                text,
                completed: false
            }

            state.todos.push(newTodo);

            // return {todos: [...state.todos, newTodo]};
        }
    },
    extraReducers: (builder) => {
        builder.addCase(getTodosThunkAsync.pending, (state: TodoState) => {
            state.loading = true;
        })
        .addCase(getTodosThunkAsync.fulfilled, (state: TodoState, {payload: todos}: PayloadAction<TodoItem[]>) => {
            console.log('fulfilled');
            state.todos = todos;
            state.loading = false;
        })
        .addCase(getTodosThunkAsync.rejected, (state: TodoState, {error}: {error: any}) => {
            state.todos = [];
            state.error = error.message;
            state.loading = false;
        })
    }
});

export const getTodosThunk = (): AppThunk => async (dispatch) => {
    dispatch(todoSlice.actions.loadTodos());
    try {
        const tmp = await getTodos();
        dispatch(todoSlice.actions.loadTodosSuccess(tmp));
    } catch (e) {
        const error = e as Error;
        dispatch(todoSlice.actions.loadTodosError(error.message))
    }
};


export const getTodosThunkAsync = createAsyncThunk('getTodosAsync', async () => {
    return await getTodos();
});


export const {toggleCompleted, addTodo} = todoSlice.actions;
export default todoSlice.reducer;