import { useState, type CSSProperties } from "react";

// Fehlerbild: map ohne key. Die Konsole warnt: Each child in a list should have a unique "key" prop.
const App = () => {
  const [todos] = useState(["essen", "trinken", "coden"]);

  return (
    <main style={styles.container}>
      <h1 style={styles.title}>Todo App (ohne key)</h1>
      <ul style={styles.list}>
        {todos.map((todo) => (
          <li>{todo}</li>
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
  list: { listStyle: "none", padding: 0, margin: 0, fontSize: 24 },
} satisfies Record<string, CSSProperties>;

export default App;
