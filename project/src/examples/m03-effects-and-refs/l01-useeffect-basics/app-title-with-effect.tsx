import { useEffect, useState, type CSSProperties } from "react";

const styles = {
  container: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    minHeight: "100vh",
    backgroundColor: "darkblue",
    color: "white",
    paddingTop: 50,
  },
  value: { margin: "10px 0", fontSize: 30, fontWeight: "bold" },
  btn: {
    padding: 20,
    border: "2px solid white",
    background: "transparent",
    color: "white",
    cursor: "pointer",
  },
} satisfies Record<string, CSSProperties>;

// Variante mit Effekt: der Seitentitel liegt außerhalb von React und wird per DOM gesetzt.
// Funktioniert, ist aber mehr Code als <title> im JSX (siehe index.tsx).
const App = () => {
  const [count, setCount] = useState(0);

  useEffect(() => {
    document.title = `Counter: ${count}`;
  }, [count]);

  return (
    <div style={styles.container}>
      <div style={styles.value}>Counter: {count}</div>
      <button style={styles.btn} onClick={() => setCount(count + 1)}>
        +
      </button>
    </div>
  );
};

export default App;
