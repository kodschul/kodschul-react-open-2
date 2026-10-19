import { useState, type KeyboardEvent } from "react";
import { useTodos } from "./useTodos";

// Die Komponente enthält nur noch Darstellung und Eingabefeld; die Listenlogik steckt in useTodos.
const App = () => {
  const [todoText, setTodoText] = useState("");
  const { todos, addTodo, removeTodo, removeAll } = useTodos();

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
