import { useRef, useState, type CSSProperties } from "react";

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
  btn: {
    padding: "10px 20px",
    border: "2px solid white",
    background: "transparent",
    color: "white",
    cursor: "pointer",
  },
} satisfies Record<string, CSSProperties>;

// Variable, State und Ref im Vergleich: Jeder Button ändert genau einen Wert.
const App = () => {
  const [stateCount, setStateCount] = useState(0);
  const refCount = useRef(0);
  // Schnappschuss des Refs: ref.current wird nur im Handler gelesen, nie im Render
  const [refSnapshot, setRefSnapshot] = useState(0);

  const bumpVariable = () => {
    let clicks = 0; // lebt nur bis zum Ende des Aufrufs
    clicks += 1;
    console.log("Variable:", clicks, "(jeder Klick startet wieder bei 0)");
  };

  const bumpState = () => {
    setStateCount(stateCount + 1);
    console.log("State (alter Wert im Handler):", stateCount);
  };

  const bumpRef = () => {
    refCount.current += 1;
    console.log("Ref:", refCount.current, "(kein Re-Render)");
  };

  return (
    <div style={styles.container}>
      <div style={styles.title}>Variable, State, Ref</div>
      <div>Variable: nur im Log sichtbar</div>
      <button style={styles.btn} onClick={bumpVariable}>
        Variable erhöhen
      </button>
      <div>State (angezeigt): {stateCount}</div>
      <button style={styles.btn} onClick={bumpState}>
        State erhöhen
      </button>
      <div>Ref (Schnappschuss): {refSnapshot}</div>
      <button style={styles.btn} onClick={bumpRef}>
        Ref erhöhen
      </button>
      <button style={styles.btn} onClick={() => setRefSnapshot(refCount.current)}>
        Ref anzeigen
      </button>
    </div>
  );
};

export default App;
