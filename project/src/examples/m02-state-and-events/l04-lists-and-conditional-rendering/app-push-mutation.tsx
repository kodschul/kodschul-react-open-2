import { useState, type CSSProperties, type KeyboardEvent } from "react";

// Fehlerbild: todos.push verändert das bestehende Array. Die Referenz bleibt gleich,
// deshalb sieht React keine Änderung und rendert nicht neu.
const App = () => {
  const [todoText, setTodoText] = useState("");
  const [todos, setTodos] = useState(["essen", "trinken", "coden"]);

  const handleKeyDown = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      todos.push(todoText); // Mutation
      setTodos(todos); // gleiche Referenz: kein Re-Render
      setTodoText("");
    }
  };

  return (
    <main style={styles.container}>
      <h1 style={styles.title}>Todo App (mit push)</h1>
      <input
        type="text"
        value={todoText}
        onChange={(e) => setTodoText(e.target.value)}
        onKeyDown={handleKeyDown}
        placeholder="Eintrag + Enter"
        style={styles.input}
      />
      <ul style={styles.list}>
        {todos.map((todo) => (
          <li key={todo}>{todo}</li>
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
  list: { listStyle: "none", padding: 0, margin: 0, fontSize: 24 },
} satisfies Record<string, CSSProperties>;

export default App;
