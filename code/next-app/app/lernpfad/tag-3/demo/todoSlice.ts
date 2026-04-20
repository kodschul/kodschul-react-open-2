import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import type { RootState } from "./store";

type Todo = { id: number; text: string; done: boolean };
type TodoState = { items: Todo[] };

const todoSlice = createSlice({
  name: "todos",
  initialState: { items: [] } as TodoState,
  reducers: {
    addTodo: (state, action: PayloadAction<string>) => {
      const newId = (state.items[state.items.length - 1]?.id ?? 0) + 1;
      state.items.push({ id: newId, text: action.payload, done: false });
    },
    removeTodo: (state, action: PayloadAction<number>) => {
      state.items = state.items.filter((t) => t.id !== action.payload);
    },
    toggleTodo: (state, action: PayloadAction<number>) => {
      const todo = state.items.find((t) => t.id === action.payload);
      if (todo) todo.done = !todo.done;
    },
  },
});

export const { addTodo, removeTodo, toggleTodo } = todoSlice.actions;
export const selectTodos = (state: RootState) => state.todos.items;
export const selectCompletedCount = (state: RootState) =>
  state.todos.items.filter((t) => t.done).length;
export default todoSlice.reducer;
