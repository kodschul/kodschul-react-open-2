import { type CSSProperties } from "react";
import { useCounter } from "./useCounter";

// Counter mit State: setCount löst ein neues Rendern aus, die Anzeige folgt dem Wert.
const App = () => {
  const { count, inc, dec, reset } = useCounter();
  console.warn("RENDERING");

  return (
    <main style={styles.container}>
      <h1 style={styles.title}>Counter App. USE-HOOK</h1>
      <div style={styles.value}>{count}</div>
      <div style={styles.row}>
        <button style={styles.button} onClick={inc}>
          +
        </button>
        <button style={styles.button} onClick={dec}>
          –
        </button>
        <button style={styles.button} onClick={reset}>
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
