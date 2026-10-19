import { useState, type KeyboardEvent } from "react";

// Starter für Lab 8.3 (a): Todo-App mit der Listenlogik direkt in der Komponente.
// Aufgabe: die Listenlogik in einen Hook useTodos() auslagern (eigene Datei src/playground/useTodos.ts).

const App = () => {
  const [todoText, setTodoText] = useState("");
  const [todos, setTodos] = useState(["essen", "trinken", "coden"]);

  // Doppelte Einträge werden ignoriert, damit `key={todo}` eindeutig bleibt.
  const addTodo = (text: string) => setTodos((prev) => (prev.includes(text) ? prev : [text, ...prev]));
  const removeTodo = (todo: string) => setTodos(todos.filter((el) => el !== todo));
  const removeAll = () => setTodos([]);

  const handleKeyDown = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter" && todoText.trim() !== "") {
      addTodo(todoText.trim());
      setTodoText("");
    }
  };

  return (
    <main className="mx-auto max-w-md p-8">
      <h1 className="mb-4 text-3xl font-bold">Todo App</h1>
      <input
        className="mb-4 w-full rounded border px-3 py-2"
        placeholder="Eintrag, dann Enter"
        value={todoText}
        onChange={(e) => setTodoText(e.target.value)}
        onKeyDown={handleKeyDown}
      />
      <ul className="mb-4 space-y-2">
        {todos.map((todo) => (
          <li
            key={todo}
            className="cursor-pointer rounded bg-blue-100 px-3 py-2 hover:bg-blue-200"
            onClick={() => removeTodo(todo)}
          >
            {todo}
          </li>
        ))}
      </ul>
      {todos.length === 0 && <p className="mb-4">Alles erledigt</p>}
      <button className="rounded border px-3 py-1 hover:bg-gray-100" onClick={removeAll}>
        Alle löschen
      </button>
    </main>
  );
};

export default App;
