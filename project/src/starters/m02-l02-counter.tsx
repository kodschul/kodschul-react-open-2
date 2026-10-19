/* eslint-disable react-hooks/immutability -- Absichtlich fehlerhaft: Der Linter meldet genau das Problem dieses Labs. */
import type { CSSProperties } from "react";

// Counter ohne State: Die Variable ändert sich, die Anzeige nicht.
const App = () => {
  console.warn("RENDERING");
  let count = 100;

  const handleCountUp = () => {
    count += 1;
    console.warn("UP", count);
  };

  const handleCountDown = () => {
    count -= 1;
    console.warn("DOWN", count);
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
