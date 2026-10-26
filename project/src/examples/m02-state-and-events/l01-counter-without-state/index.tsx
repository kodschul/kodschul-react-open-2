/* eslint-disable react-hooks/immutability -- Absichtlich fehlerhaft: Der Linter meldet genau das Problem dieses Labs. */
import type { CSSProperties } from "react";
import { useEffect, useState } from "react";

// Counter ohne State: Die Variable ändert sich, die Anzeige nicht.
const App = () => {
  console.warn("RENDERING");

  const [count, setCount] = useState(3);
  const [maxCount, setMaxCount] = useState(100);
  const [minCount, setMinCount] = useState(1);

  useEffect(() => {
    setInterval(() => {
      setCount((currentCount) => currentCount + 1);
    }, 1000);

    // setTimeout(() => {
    //   setCount(0);
    // }, 4000);
  }, []);

  const handleCountUp = () => {
    if (count + 1 > maxCount) {
      return;
    }
    setCount(count + 1);
  };

  const handleCountDown = () => {
    if (count - 1 < minCount) {
      return;
    }
    setCount(count - 1);
  };

  return (
    <main style={styles.container}>
      <h1 style={styles.title}>Counter App</h1>
      <div style={styles.value}>{count}</div>

      <div style={styles.value}>{count}</div>
      <div style={styles.value}>{count}</div>

      <div style={styles.row}>
        <input
          placeholder="Enter max"
          type="number"
          value={maxCount}
          onChange={(e) => setMaxCount(e.target.valueAsNumber)}
        />

        <button style={styles.button} onClick={handleCountUp}>
          +
        </button>
        <button style={styles.button} onClick={handleCountDown}>
          –
        </button>

        <input
          type="number"
          placeholder="Enter min"
          value={minCount}
          onChange={(e) => setMinCount(e.target.valueAsNumber)}
        />
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
