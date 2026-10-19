import { useState, type CSSProperties } from "react";

// Erweiterung: Schrittweite als zweiter State neben dem Zähler.
const App = () => {
  const [count, setCount] = useState(100);
  const [step, setStep] = useState(1);

  const handleCountUp = () => {
    setCount(count + step);
  };

  const handleCountDown = () => {
    setCount(Math.max(0, count - step));
  };

  const handleReset = () => {
    setCount(100);
    setStep(1);
  };

  return (
    <main style={styles.container}>
      <h1 style={styles.title}>Counter App</h1>
      <div style={styles.value}>{count}</div>
      <label>
        Schrittweite:{" "}
        <input
          type="number"
          min={1}
          value={step}
          onChange={(e) => setStep(Number(e.target.value))}
          style={{ width: 60 }}
        />
      </label>
      <div style={styles.row}>
        <button style={styles.button} onClick={handleCountUp}>
          +{step}
        </button>
        <button style={styles.button} onClick={handleCountDown}>
          –{step}
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
