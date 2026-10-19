import { useEffect, useRef, useState, type CSSProperties } from "react";

const styles = {
  container: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    minHeight: "100vh",
    backgroundColor: "darkblue",
    color: "white",
    paddingTop: 50,
    gap: 12,
  },
  title: { fontSize: 30, fontWeight: "bold" },
  input: { fontSize: 20, padding: 8 },
  value: { fontSize: 40, fontWeight: "bold" },
  btn: {
    padding: "10px 20px",
    border: "2px solid white",
    background: "transparent",
    color: "white",
    cursor: "pointer",
  },
} satisfies Record<string, CSSProperties>;

const App = () => {
  const [inputValue, setInputValue] = useState("");
  const [count, setCount] = useState(0);

  // Ref auf das DOM-Element und Ref als unsichtbarer Zähler
  const inputRef = useRef<HTMLInputElement>(null);
  const clickCountRef = useRef(0);

  // Autofokus: ref.current ist erst nach dem ersten Render gefüllt, deshalb im Effekt
  useEffect(() => {
    inputRef.current?.focus();
  }, []);

  const changeCount = (delta: number) => {
    setCount(count + delta);
    // Ref schreiben und lesen: im Event-Handler erlaubt, löst kein Re-Render aus
    clickCountRef.current += 1;
    console.log(`Klicks insgesamt: ${clickCountRef.current}`);
  };

  // zählt nur im Ref: kein State, daher auch kein Re-Render
  const countOnly = () => {
    clickCountRef.current += 1;
    console.log(`Klicks insgesamt: ${clickCountRef.current}`);
  };

  return (
    <div style={styles.container}>
      <div style={styles.title}>Input App</div>
      <input
        ref={inputRef}
        style={styles.input}
        type="text"
        value={inputValue}
        onChange={(e) => setInputValue(e.target.value)}
        placeholder="Tippe etwas ein …"
      />
      <div>Eingabe: {inputValue}</div>
      <button style={styles.btn} onClick={() => setInputValue("")}>
        Clear
      </button>

      <div style={styles.title}>Counter App</div>
      <div style={styles.value}>{count}</div>
      <div style={{ display: "flex", gap: 12 }}>
        <button style={styles.btn} onClick={() => changeCount(1)}>
          +
        </button>
        <button style={styles.btn} onClick={() => changeCount(-1)}>
          –
        </button>
        <button style={styles.btn} onClick={countOnly}>
          Nur zählen
        </button>
      </div>
    </div>
  );
};

export default App;
