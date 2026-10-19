import { useState, type CSSProperties } from "react";

const MAX_LENGTH = 10;

// Validierung: Die Meldung wird aus dem State abgeleitet, nicht in einem eigenen State gespeichert.
const App = () => {
  const [inputValue, setInputValue] = useState("");
  const isTooLong = inputValue.length > MAX_LENGTH;

  return (
    <main style={styles.container}>
      <h1 style={styles.title}>Input App mit Prüfung</h1>
      <input
        type="text"
        value={inputValue}
        onChange={(e) => setInputValue(e.target.value)}
        style={{ ...styles.input, borderColor: isTooLong ? "red" : "gray" }}
      />
      {isTooLong && <p style={{ color: "salmon" }}>Maximal {MAX_LENGTH} Zeichen erlaubt.</p>}
      <p>
        {inputValue.length} / {MAX_LENGTH} Zeichen
      </p>
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
  input: { fontSize: 20, padding: 8, borderWidth: 3, borderStyle: "solid" },
  button: { padding: "8px 16px", fontSize: 18, cursor: "pointer" },
} satisfies Record<string, CSSProperties>;

export default App;
