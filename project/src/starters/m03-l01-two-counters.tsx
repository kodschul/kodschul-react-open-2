import type { CSSProperties } from "react";

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

// TODO 1: Zwei States anlegen (count1, count2) und die festen Zahlen ersetzen.
// TODO 2: Die Buttons mit den Settern verbinden.
// TODO 3: Drei Effekte ergänzen (siehe Übung).
const App = () => {
  return (
    <div style={styles.container}>
      <div style={styles.title}>Effekt-Labor</div>
      <div style={styles.value}>Counter 1: 0</div>
      <button style={styles.btn}>+ Counter 1</button>
      <div style={styles.value}>Counter 2: 0</div>
      <button style={styles.btn}>+ Counter 2</button>
    </div>
  );
};

export default App;
