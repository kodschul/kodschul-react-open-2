// ============================================================
// SCHRITT 2 – Slice: Reducer + Actions in einer Datei
// ============================================================
//
// Ein "Slice" ist ein Ausschnitt des globalen State.
// createSlice() generiert automatisch:
//   - Reducer-Funktion
//   - Action Creators (die Funktionen die Actions erzeugen)
//
// Immer ist bereits eingebaut:
//   → Direkte Mutationen im Reducer sind erlaubt!
//   → RTK nutzt Immer unter der Haube (erzeugt neuen State)
//
// Diese Datei: todoSlice.ts
// ============================================================

import { createSlice, PayloadAction } from "@reduxjs/toolkit";

// ── State-Typ definieren ──────────────────────────────────────
type Todo = {
  id: number;
  text: string;
  done: boolean;
};

type TodoState = {
  items: Todo[];
};

// ── Initial State ─────────────────────────────────────────────
const initialState: TodoState = {
  items: [],
};

// ── Slice erstellen ───────────────────────────────────────────
export const todoSlice = createSlice({
  // name: Präfix für alle generierten Action-Types
  // z.B. "todos/addTodo", "todos/removeTodo"
  name: "todos",

  initialState,

  // reducers: Objekt mit Reducer-Funktionen
  // Jede Funktion wird automatisch eine Action
  reducers: {
    // PayloadAction<string> → der Payload ist ein String
    addTodo: (state, action: PayloadAction<string>) => {
      // Mit Immer: direkte Mutation erlaubt!
      // Ohne Immer: { ...state, items: [...state.items, newTodo] }
      const newId = (state.items[state.items.length - 1]?.id ?? 0) + 1;
      state.items.push({ id: newId, text: action.payload, done: false });
    },

    // PayloadAction<number> → ID des zu löschenden Todos
    removeTodo: (state, action: PayloadAction<number>) => {
      state.items = state.items.filter((t) => t.id !== action.payload);
    },

    // PayloadAction<number> → ID des umzuschaltenden Todos
    toggleTodo: (state, action: PayloadAction<number>) => {
      const todo = state.items.find((t) => t.id === action.payload);
      if (todo) {
        // Direkte Mutation – Immer macht das sicher!
        todo.done = !todo.done;
      }
    },
  },
});

// ── Action Creators exportieren ───────────────────────────────
// Diese werden in Komponenten mit dispatch() aufgerufen
export const { addTodo, removeTodo, toggleTodo } = todoSlice.actions;

// ── Selectors exportieren ─────────────────────────────────────
// Selectors: Hilfsfunktionen um State-Teile zu lesen
// Auslagern verhindert Wiederholung und macht Refactoring einfacher

import type { RootState } from "./schritt-1-store";

export const selectTodos = (state: RootState) => state.todos.items;
export const selectCompletedCount = (state: RootState) =>
  state.todos.items.filter((t) => t.done).length;
export const selectTotalCount = (state: RootState) => state.todos.items.length;

// ── Reducer exportieren (für den Store) ───────────────────────
export default todoSlice.reducer;
