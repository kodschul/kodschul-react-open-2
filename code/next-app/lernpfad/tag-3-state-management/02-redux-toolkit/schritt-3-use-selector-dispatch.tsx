"use client";

// ============================================================
// SCHRITT 3 – useSelector & useDispatch in Komponenten
// ============================================================
//
// useSelector → State aus dem Store lesen
// useDispatch → Actions an den Store schicken
//
// Ablauf:
//   1. useAppSelector(selector) → gibt aktuellen State zurück
//   2. Re-render passiert automatisch wenn sich der relevante State ändert
//   3. useAppDispatch() gibt dispatch zurück
//   4. dispatch(actionCreator(payload)) → State-Änderung auslösen
//
// Diese Datei zeigt:
//   - Counter-Komponente mit Redux State
//   - Todo-Liste mit Redux State
// ============================================================

import { useAppDispatch, useAppSelector } from "./schritt-1-store";
import {
  addTodo,
  removeTodo,
  toggleTodo,
  selectTodos,
  selectCompletedCount,
} from "./schritt-2-slice";
import { useState } from "react";

// ── Counter mit Redux ─────────────────────────────────────────
// (Erfordert einen counterSlice – hier als Muster gezeigt)
//
// export function Counter() {
//   const count = useAppSelector((state) => state.counter.value);
//   const dispatch = useAppDispatch();
//
//   return (
//     <div>
//       <button onClick={() => dispatch(decrement())}>-</button>
//       <span>{count}</span>
//       <button onClick={() => dispatch(increment())}>+</button>
//     </div>
//   );
// }

// ── Todo-Liste mit Redux ──────────────────────────────────────
export function TodoListRedux() {
  const dispatch = useAppDispatch();

  // useSelector mit ausgelagertem Selector
  const todos = useAppSelector(selectTodos);
  const completedCount = useAppSelector(selectCompletedCount);

  const [input, setInput] = useState("");

  function handleAdd(e: React.FormEvent) {
    e.preventDefault();
    if (!input.trim()) return;
    // dispatch() + Action Creator aufrufen
    dispatch(addTodo(input.trim()));
    setInput("");
  }

  return (
    <div className="max-w-md mx-auto p-6">
      <h2 className="text-2xl font-bold mb-1">Todos (Redux)</h2>
      <p className="text-sm text-gray-500 mb-4">
        {completedCount} von {todos.length} erledigt
      </p>

      <form onSubmit={handleAdd} className="flex gap-2 mb-4">
        <input
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Neuer Todo…"
          className="flex-1 border rounded px-3 py-2"
        />
        <button
          type="submit"
          className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
        >
          Hinzufügen
        </button>
      </form>

      <ul className="space-y-2">
        {todos.map((todo) => (
          <li
            key={todo.id}
            className="flex items-center justify-between bg-white border rounded px-3 py-2"
          >
            <span
              onClick={() => dispatch(toggleTodo(todo.id))}
              className={`cursor-pointer ${
                todo.done ? "line-through text-gray-400" : ""
              }`}
            >
              {todo.text}
            </span>
            <button
              onClick={() => dispatch(removeTodo(todo.id))}
              className="text-red-400 hover:text-red-600 text-sm"
            >
              Löschen
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
}

// ============================================================
// Merke: useSelector ist performant
// ============================================================
//
// Jedes Mal wenn der Store sich ändert, führt Redux einen
// "shallow equality check" durch.
// Die Komponente re-rendert NUR wenn sich der selektierte
// Wert tatsächlich geändert hat.
//
// → selectTodos gibt dasselbe Array-Referenz zurück?
//   → Kein Re-render (Immer garantiert neue Referenz bei Änderung)
