import { configureStore, ThunkAction, Action, createReducer, createAction, createSlice } from '@reduxjs/toolkit';
import counterReducer from '../features/counter/counterSlice';
import todoReducer from './components/Todo/todoSlice';

type myCounterState = {value: number};
const initialStateMyCounter: myCounterState = {value: 5};


const myCounterSlice = createSlice({
  name: 'my-counter',
  initialState: initialStateMyCounter,
  reducers: {
    increment: (state: myCounterState) => ({value: state.value + 1}),
    decrement:  (state: myCounterState) => ({value: state.value - 1}),
    reset: () => ({value: 0})
  }
});




export const store = configureStore({
  reducer: {
    counter: counterReducer,
    myCounter: myCounterSlice.reducer,
    todo: todoReducer
  }
});

store.subscribe(() => {
  console.log('ciao', store.getState());
})

export const {increment, decrement, reset} = myCounterSlice.actions;

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  Action<string>
>;
