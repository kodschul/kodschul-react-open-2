import { useEffect, useState, type CSSProperties } from "react";

// Controlled Input: Der State ist die einzige Wahrheit, das Feld zeigt nur den State an.
const App = () => {
  const [inputValue, setInputValue] = useState("");

  const [errorrMessage, setErrorMessage] = useState("");

  const maxInputValue = 10;

  const handleInputChangeWithErrorMessage = (e) => {
    const value = e.target.value;
    setInputValue(value);

    let errText: string | undefined = undefined;

    if (value.length > maxInputValue) {
      errText = "Max text reached";
    } else if (!/^[a-z0-9]+$/i.test(value) && value != "") {
      errText = "Text must be alphanumeric";
    }

    setErrorMessage(errText);
  };

  const handleInputChange = (e) => {
    const value = e.target.value;

    if (!/^[a-z0-9]+$/i.test(value) && value != "") {
      return;
    }

    setInputValue(value);
  };

  return (
    <main style={styles.container}>
      <h1 style={styles.title}>Input App</h1>
      <input
        // type="text"
        type={"text"}
        value={inputValue}
        onChange={handleInputChangeWithErrorMessage}
        placeholder="Hier etwas eingeben …"
        style={{
          ...styles.input,
          border: errorrMessage ? "5px solid red" : "",
        }}
      />
      {errorrMessage && <p>{errorrMessage} </p>}
      <p>Eingegebener Text: {inputValue}</p>
      <p>
        Eingegebener Text Länge: {inputValue.length} / {maxInputValue}
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
  input: { fontSize: 20, padding: 8 },
  button: { padding: "8px 16px", fontSize: 18, cursor: "pointer" },
} satisfies Record<string, CSSProperties>;

export default App;
