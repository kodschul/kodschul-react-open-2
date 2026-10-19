import { useState, type CSSProperties, type KeyboardEvent } from "react";

type Todo = { id: string; text: string };

// Mit eigener id als key: gleiche Texte sind erlaubt und lassen sich einzeln entfernen.
const App = () => {
  const [todoText, setTodoText] = useState("");
  const [todos, setTodos] = useState<Todo[]>([
    { id: crypto.randomUUID(), text: "essen" },
    { id: crypto.randomUUID(), text: "trinken" },
  ]);

  const handleKeyDown = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter" && todoText.trim() !== "") {
      setTodos([{ id: crypto.randomUUID(), text: todoText.trim() }, ...todos]);
      setTodoText("");
    }
  };

  const removeTodo = (id: string) => {
    setTodos(todos.filter((todo) => todo.id !== id));
  };

  return (
    <main style={styles.container}>
      <h1 style={styles.title}>Todo App (mit id)</h1>
      <input
        type="text"
        value={todoText}
        onChange={(e) => setTodoText(e.target.value)}
        onKeyDown={handleKeyDown}
        placeholder="Eintrag + Enter"
        style={styles.input}
      />
      {todos.length === 0 && <p>Alles erledigt</p>}
      <ul style={styles.list}>
        {todos.map((todo) => (
          <li key={todo.id}>
            <button style={styles.item} onClick={() => removeTodo(todo.id)}>
              {todo.text}
            </button>
          </li>
        ))}
      </ul>
    </main>
  );
};

const styles = {
  container: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    gap: 12,
    padding: 32,
    minHeight: "100vh",
    boxSizing: "border-box",
    backgroundColor: "#0a52c6",
    color: "white",
  },
  title: { fontSize: 30, margin: 0 },
  input: { fontSize: 24, padding: 8 },
  list: { listStyle: "none", padding: 0, margin: 0 },
  item: {
    fontSize: 24,
    marginTop: 10,
    background: "none",
    border: "none",
    color: "white",
    cursor: "pointer",
  },
} satisfies Record<string, CSSProperties>;

export default App;
