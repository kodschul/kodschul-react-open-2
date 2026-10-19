import type { CSSProperties } from "react";

const styles = {
  container: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    gap: 16,
    minHeight: "100vh",
    backgroundColor: "darkblue",
    color: "white",
  },
  secs: { fontSize: 100, fontWeight: "bold" },
  input: { fontSize: 30, width: 120, padding: 8 },
  btn: {
    padding: "10px 20px",
    border: "2px solid white",
    background: "transparent",
    color: "white",
    cursor: "pointer",
    fontSize: 20,
  },
} satisfies Record<string, CSSProperties>;

// TODO 1: Eingabewert, verbleibende Sekunden und isRunning als State anlegen.
// TODO 2: Ein Effekt tickt per setInterval und räumt per Cleanup auf.
// TODO 3: Hintergrund rot, sobald die Zeit abgelaufen ist (abgeleiteter Wert, kein State).
const App = () => {
  return (
    <div style={styles.container}>
      <div style={styles.secs}>10</div>
      <input style={styles.input} type="number" min={0} defaultValue={10} />
      <div style={{ display: "flex", gap: 12 }}>
        <button style={styles.btn}>Start</button>
        <button style={styles.btn}>Stop</button>
      </div>
    </div>
  );
};

export default App;
