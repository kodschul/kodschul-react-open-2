import { useState, type CSSProperties } from "react";

// Controlled Input: Der State ist die einzige Wahrheit, das Feld zeigt nur den State an.
const App = () => {
  const [inputValue, setInputValue] = useState("");

  return (
    <main style={styles.container}>
      <h1 style={styles.title}>Input App</h1>
      <input
        type="text"
        value={inputValue}
        onChange={(e) => setInputValue(e.target.value)}
        placeholder="Hier etwas eingeben …"
        style={styles.input}
      />
      <p>Eingegebener Text: {inputValue}</p>
      <button style={styles.button} onClick={() => setInputValue("")}>
        Clear
      </button>
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
  button: { padding: "8px 16px", fontSize: 18, cursor: "pointer" },
} satisfies Record<string, CSSProperties>;

export default App;
