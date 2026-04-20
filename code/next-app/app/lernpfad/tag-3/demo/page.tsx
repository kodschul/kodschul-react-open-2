"use client";

import { Provider } from "react-redux";
import { store, useAppDispatch, useAppSelector } from "./store";
import { increment, decrement, reset, selectCount } from "./counterSlice";
import {
  addTodo,
  removeTodo,
  toggleTodo,
  selectTodos,
  selectCompletedCount,
} from "./todoSlice";
import { useState } from "react";

// ── Counter Component ────────────────────────────────────────
function Counter() {
  const count = useAppSelector(selectCount);
  const dispatch = useAppDispatch();

  return (
    <div className="bg-white rounded-xl shadow p-6">
      <h2 className="text-xl font-bold mb-4">Counter (Redux)</h2>
      <div className="flex items-center gap-4">
        <button
          onClick={() => dispatch(decrement())}
          className="w-10 h-10 rounded-full bg-gray-100 hover:bg-gray-200 text-xl font-bold"
        >
          −
        </button>
        <span className="text-4xl font-black w-16 text-center">{count}</span>
        <button
          onClick={() => dispatch(increment())}
          className="w-10 h-10 rounded-full bg-blue-500 text-white hover:bg-blue-600 text-xl font-bold"
        >
          +
        </button>
      </div>
      <button
        onClick={() => dispatch(reset())}
        className="mt-3 text-sm text-gray-400 hover:text-gray-600"
      >
        Zurücksetzen
      </button>
    </div>
  );
}

// ── Todo Component ────────────────────────────────────────────
function TodoList() {
  const dispatch = useAppDispatch();
  const todos = useAppSelector(selectTodos);
  const completedCount = useAppSelector(selectCompletedCount);
  const [input, setInput] = useState("");

  function handleAdd(e: React.FormEvent) {
    e.preventDefault();
    if (!input.trim()) return;
    dispatch(addTodo(input.trim()));
    setInput("");
  }

  return (
    <div className="bg-white rounded-xl shadow p-6">
      <h2 className="text-xl font-bold mb-1">Todos (Redux)</h2>
      <p className="text-sm text-gray-400 mb-4">
        {completedCount}/{todos.length} erledigt
      </p>
      <form onSubmit={handleAdd} className="flex gap-2 mb-4">
        <input
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Neuer Todo…"
          className="flex-1 border rounded px-3 py-2 text-sm"
        />
        <button
          type="submit"
          className="bg-blue-500 text-white px-3 py-2 rounded text-sm hover:bg-blue-600"
        >
          +
        </button>
      </form>
      {todos.length === 0 ? (
        <p className="text-gray-400 text-sm text-center py-4">
          Noch keine Todos
        </p>
      ) : (
        <ul className="space-y-2">
          {todos.map((todo) => (
            <li
              key={todo.id}
              className="flex items-center justify-between text-sm"
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
                className="text-red-400 hover:text-red-600"
              >
                ×
              </button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

// ── Page (mit Provider) ───────────────────────────────────────
export default function Tag3Demo() {
  return (
    <Provider store={store}>
      <div className="min-h-screen bg-gray-50 py-12 px-4">
        <div className="max-w-2xl mx-auto">
          <h1 className="text-3xl font-bold text-gray-800 mb-2">
            Tag 3 – Redux Toolkit Demo
          </h1>
          <p className="text-gray-500 mb-8 text-sm">
            Öffne die Redux DevTools um den State-Verlauf zu sehen!
          </p>
          <div className="grid md:grid-cols-2 gap-6">
            <Counter />
            <TodoList />
          </div>
        </div>
      </div>
    </Provider>
  );
}
