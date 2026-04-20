"use client";

// ============================================================
// TAG 2 – DEMO: TodoApp (zum Testen)
// ============================================================
//
// Diese Komponente wird in den Tests verwendet.
// Sie zeigt bewusst alle testbaren Muster:
//   ✓ Formular mit Validierung
//   ✓ Listenrendering
//   ✓ Interaktionen (click, type)
//   ✓ data-cy Attribute für Cypress
// ============================================================

import { useState } from "react";

type Todo = { id: number; text: string; done: boolean };

export function TodoApp() {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [input, setInput] = useState("");
  const [error, setError] = useState("");
  let nextId = 1;

  function addTodo(e: React.FormEvent) {
    e.preventDefault();
    if (!input.trim()) {
      setError("Pflichtfeld: Bitte einen Text eingeben.");
      return;
    }
    setError("");
    setTodos((prev) => [
      ...prev,
      { id: nextId++, text: input.trim(), done: false },
    ]);
    setInput("");
  }

  function toggleTodo(id: number) {
    setTodos((prev) =>
      prev.map((t) => (t.id === id ? { ...t, done: !t.done } : t))
    );
  }

  function deleteTodo(id: number) {
    setTodos((prev) => prev.filter((t) => t.id !== id));
  }

  return (
    <div className="max-w-md mx-auto p-6">
      <h2 className="text-2xl font-bold mb-4">Meine Todos</h2>

      <form onSubmit={addTodo} className="flex gap-2 mb-4">
        <input
          data-cy="todo-input"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Neuer Todo…"
          className="flex-1 border rounded px-3 py-2"
        />
        <button
          data-cy="add-button"
          type="submit"
          className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
        >
          Hinzufügen
        </button>
      </form>

      {error && (
        <p data-cy="input-error" className="text-red-500 text-sm mb-3">
          {error}
        </p>
      )}

      {todos.length === 0 ? (
        <p className="text-gray-400">Keine Todos vorhanden.</p>
      ) : (
        <ul className="space-y-2">
          {todos.map((todo) => (
            <li
              key={todo.id}
              data-cy="todo-item"
              className="flex items-center justify-between bg-white border rounded px-3 py-2"
            >
              <span
                onClick={() => toggleTodo(todo.id)}
                className={`cursor-pointer ${
                  todo.done ? "line-through text-gray-400" : ""
                }`}
              >
                {todo.text}
              </span>
              <button
                data-cy="delete-button"
                onClick={() => deleteTodo(todo.id)}
                className="text-red-400 hover:text-red-600 text-sm"
              >
                Löschen
              </button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

export default function TodoAppPage() {
  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <TodoApp />
    </div>
  );
}
