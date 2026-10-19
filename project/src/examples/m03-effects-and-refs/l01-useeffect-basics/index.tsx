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
  title: { fontSize: 40, fontWeight: "bold" },
  value: { margin: "10px 0", fontSize: 30, fontWeight: "bold" },
  btn: {
    padding: 20,
    border: "2px solid white",
    background: "transparent",
    color: "white",
    cursor: "pointer",
  },
} satisfies Record<string, CSSProperties>;

const App = () => {
  const [count1, setCount1] = useState(0);
  const [count2, setCount2] = useState(0);

  // Abgeleiteter Wert: wird beim Rendern berechnet, ein Effekt wäre überflüssig
  const parity = count1 % 2 === 0 ? "gerade" : "ungerade";

  console.log("Render");

  // Effekt 1: leeres Array, läuft einmal nach dem ersten Render
  useEffect(() => {
    console.log("Effekt 1: Willkommen!");
  }, []);

  // Effekt 2: läuft nach dem ersten Render und bei jeder Änderung von count1
  useEffect(() => {
    console.log("Effekt 2: count1 ist jetzt", count1);
  }, [count1]);

  // Effekt 3: ohne Array, läuft nach jedem Render
  useEffect(() => {
    console.log("Effekt 3: irgendetwas hat sich geändert");
  });

  return (
    <div style={styles.container}>
      {/* React 19 setzt den Seitentitel direkt aus dem Render, ohne Effekt */}
      <title>{`Counter: ${count1}`}</title>
      <div style={styles.title}>Effekt-Labor</div>
      <div style={styles.value}>
        Counter 1: {count1} ({parity})
      </div>
      <button style={styles.btn} onClick={() => setCount1(count1 + 1)}>
        + Counter 1
      </button>
      <div style={styles.value}>Counter 2: {count2}</div>
      <button style={styles.btn} onClick={() => setCount2(count2 + 1)}>
        + Counter 2
      </button>
    </div>
  );
};

export default App;
