import { useState, type CSSProperties } from "react";

// Counter mit State: setCount löst ein neues Rendern aus, die Anzeige folgt dem Wert.
const App = () => {
  console.warn("RENDERING");
  const [count, setCount] = useState(100);

  const handleCountUp = () => {
    setCount(count + 1);
    console.warn("UP", count); // zeigt noch den alten Wert: count ist ein Schnappschuss dieses Renders
  };

  const handleCountDown = () => {
    if (count > 0) {
      setCount(count - 1);
    }
    console.warn("DOWN", count);
  };

  const handleReset = () => {
    setCount(100);
  };

  return (
    <main style={styles.container}>
      <h1 style={styles.title}>Counter App</h1>
      <div style={styles.value}>{count}</div>
      <div style={styles.row}>
        <button style={styles.button} onClick={handleCountUp}>
          +
        </button>
        <button style={styles.button} onClick={handleCountDown}>
          –
        </button>
        <button style={styles.button} onClick={handleReset}>
          Reset
        </button>
      </div>
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
    backgroundColor: "darkblue",
    color: "white",
  },
  title: { fontSize: 40, margin: 0 },
  value: { fontSize: 40, fontWeight: "bold" },
  row: { display: "flex", gap: 12 },
  button: { padding: "12px 24px", fontSize: 24, cursor: "pointer" },
} satisfies Record<string, CSSProperties>;

export default App;
