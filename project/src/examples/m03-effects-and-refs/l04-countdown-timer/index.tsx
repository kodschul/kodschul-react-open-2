import { useEffect, useState, type CSSProperties } from "react";

const styles = {
  container: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    gap: 16,
    minHeight: "100vh",
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

const App = () => {
  const [inputSecs, setInputSecs] = useState(10);
  const [secsLeft, setSecsLeft] = useState(10);
  const [isRunning, setRunning] = useState(false);

  // Abgeleitete Werte: Sie ergeben sich aus State und brauchen weder State noch Effekt
  const isExpired = secsLeft === 0;
  const isTicking = isRunning && secsLeft > 0;

  // Ein Effekt für das Ticken. Erreicht secsLeft 0, wird isTicking false:
  // React räumt das Intervall per Cleanup auf, ein "Stopp bei 0"-Effekt ist unnötig.
  useEffect(() => {
    if (!isTicking) return;

    const timerId = window.setInterval(() => {
      setSecsLeft((prev) => prev - 1); // funktionales Update: immer der aktuelle Wert
    }, 1000);

    return () => window.clearInterval(timerId);
  }, [isTicking]);

  const start = () => {
    setSecsLeft(inputSecs);
    setRunning(true);
  };

  return (
    <div style={{ ...styles.container, backgroundColor: isExpired ? "red" : "darkblue" }}>
      <div style={styles.secs}>{secsLeft}</div>
      <input
        style={styles.input}
        type="number"
        min={0}
        value={inputSecs}
        onChange={(e) => setInputSecs(Math.max(0, e.target.valueAsNumber || 0))}
      />
      <div style={{ display: "flex", gap: 12 }}>
        <button style={styles.btn} onClick={start}>
          Start
        </button>
        <button style={styles.btn} onClick={() => setRunning(false)}>
          Stop
        </button>
        {/* Erweiterung: Fortsetzen ohne Zurücksetzen */}
        <button style={styles.btn} onClick={() => setRunning(true)} disabled={isRunning}>
          Fortsetzen
        </button>
      </div>
    </div>
  );
};

export default App;
