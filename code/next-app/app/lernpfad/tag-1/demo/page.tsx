"use client";

// ============================================================
// TAG 1 – DEMO: Todos-API Live Demo
// ============================================================
//
// Diese Demo-Seite zeigt alle Konzepte des Tages in Aktion:
//   1. GET /api/todos  → Todos laden
//   2. POST /api/todos → Neuen Todo anlegen
//   3. DELETE /api/todos?id=X → Todo löschen
//
// Route: /lernpfad/tag-1/demo
// ============================================================

import { useState, useEffect } from "react";

type Todo = { id: number; text: string; done: boolean };

export default function Tag1Demo() {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // GET: Todos beim ersten Render laden
  useEffect(() => {
    fetch("/api/todos")
      .then((r) => r.json())
      .then((data) => setTodos(data))
      .catch(() => setError("Konnte Todos nicht laden."))
      .finally(() => setLoading(false));
  }, []);

  // POST: Neuen Todo anlegen
  async function addTodo(e: React.FormEvent) {
    e.preventDefault();
    if (!input.trim()) return;

    const res = await fetch("/api/todos", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ text: input }),
    });

    if (res.ok) {
      const newTodo = await res.json();
      setTodos((prev) => [...prev, newTodo]);
      setInput("");
    }
  }

  // DELETE: Todo entfernen
  async function deleteTodo(id: number) {
    await fetch(`/api/todos?id=${id}`, { method: "DELETE" });
    setTodos((prev) => prev.filter((t) => t.id !== id));
  }

  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4">
      <div className="max-w-md mx-auto">
        <h1 className="text-3xl font-bold text-gray-800 mb-2">
          Tag 1 – API Routes Demo
        </h1>
        <p className="text-gray-500 mb-8 text-sm">
          GET · POST · DELETE  |  Route: <code className="bg-gray-100 px-1 rounded">/api/todos</code>
        </p>

        {/* Formular → POST /api/todos */}
        <form onSubmit={addTodo} className="flex gap-2 mb-6">
          <input
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Neuer Todo…"
            className="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <button
            type="submit"
            className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors font-medium"
          >
            Hinzufügen
          </button>
        </form>

        {/* Todos Liste → GET /api/todos */}
        {loading && (
          <div className="text-center text-gray-500 py-8">Laden…</div>
        )}
        {error && (
          <div className="bg-red-50 text-red-600 p-4 rounded-lg">{error}</div>
        )}
        {!loading && todos.length === 0 && (
          <p className="text-gray-400 text-center py-8">
            Noch keine Todos. Füge deinen ersten hinzu!
          </p>
        )}
        <ul className="space-y-2">
          {todos.map((todo) => (
            <li
              key={todo.id}
              className="flex items-center justify-between bg-white px-4 py-3 rounded-lg shadow-sm border border-gray-100"
            >
              <span className="text-gray-800">{todo.text}</span>
              <button
                onClick={() => deleteTodo(todo.id)}
                className="text-red-400 hover:text-red-600 text-sm font-medium transition-colors"
              >
                Löschen
              </button>
            </li>
          ))}
        </ul>

        {/* Links zu anderen API-Routen */}
        <div className="mt-10 pt-6 border-t border-gray-200">
          <p className="text-xs text-gray-400 font-medium uppercase tracking-wide mb-3">
            Weitere API-Routen direkt testen:
          </p>
          <div className="flex flex-wrap gap-2">
            {[
              { href: "/api/hello", label: "/api/hello" },
              { href: "/api/characters?page=1", label: "/api/characters" },
              { href: "/api/characters/1", label: "/api/characters/1" },
              { href: "/sitemap.xml", label: "/sitemap.xml" },
              { href: "/robots.txt", label: "/robots.txt" },
            ].map(({ href, label }) => (
              <a
                key={href}
                href={href}
                target="_blank"
                className="text-xs bg-gray-100 hover:bg-blue-50 text-blue-600 px-3 py-1.5 rounded-full transition-colors"
              >
                {label}
              </a>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
