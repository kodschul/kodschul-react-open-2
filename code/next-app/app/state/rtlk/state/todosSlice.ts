import { createSlice, PayloadAction } from "@reduxjs/toolkit";

type TodoState = {
  items: string[];
  todoText: string;
};

// ── Initial State ─────────────────────────────────────────────
const initialState: TodoState = {
  items: [],
  todoText: "",
};

// ── Slice erstellen ───────────────────────────────────────────
export const todoSlice = createSlice({
  name: "todos",

  initialState,

  reducers: {
    addTodo: (state) => {
      state.items = [state.todoText, ...state.items];
    },

    removeTodo: (state, action: PayloadAction<string>) => {
      state.items = state.items.filter((x) => x != action.payload);
    },

    setDraftText: (state, action: PayloadAction<string>) => {
      state.todoText = action.payload;
    },
  },
});

export const { addTodo, removeTodo, setDraftText } = todoSlice.actions;

export default todoSlice.reducer;
