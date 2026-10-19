import { useState, type CSSProperties, type KeyboardEvent } from "react";

// Todo-App: Liste mit map, Enter fügt oben ein, Klick entfernt, leere Liste zeigt eine Meldung.
const App = () => {
  const [todoText, setTodoText] = useState("");
  const [todos, setTodos] = useState(["essen", "trinken", "coden"]);

  const handleKeyDown = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      setTodos([todoText, ...todos]); // neues Array statt todos.push(...)
      setTodoText("");
    }
  };

  const removeTodo = (todo: string) => {
    setTodos(todos.filter((el) => el !== todo)); // neues Array ohne den Eintrag
  };

  return (
    <main style={styles.container}>
      <h1 style={styles.title}>Todo App</h1>
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
          <li key={todo}>
            <button style={styles.item} onClick={() => removeTodo(todo)}>
              {todo}
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
