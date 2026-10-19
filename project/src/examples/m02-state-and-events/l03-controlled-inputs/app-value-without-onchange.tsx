import { useState, type CSSProperties } from "react";

// Fehlerbild: value ohne onChange. Das Feld ist schreibgeschützt, React warnt in der Konsole.
const App = () => {
  const [inputValue] = useState("");

  return (
    <main style={styles.container}>
      <h1 style={styles.title}>Input App (ohne onChange)</h1>
      <input type="text" value={inputValue} placeholder="Tippen hat keine Wirkung" style={styles.input} />
      <p>Eingegebener Text: {inputValue}</p>
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
  title: { fontSize: 30, margin: 0 },
  input: { fontSize: 20, padding: 8 },
} satisfies Record<string, CSSProperties>;

export default App;
