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
  title: { fontSize: 30, fontWeight: "bold" },
  time: { padding: "30px 0", fontSize: 100, cursor: "pointer" },
  btn: {
    padding: 15,
    border: "2px solid white",
    background: "transparent",
    color: "white",
    cursor: "pointer",
  },
} satisfies Record<string, CSSProperties>;

// TODO Stufe a: Zeit als State halten und per Intervall im Effekt jede Sekunde aktualisieren.
// TODO Stufe b: Klick auf die Uhrzeit stoppt das Intervall.
// TODO Stufe c: Button "Restart" startet die Uhr über State neu.
const App = () => {
  return (
    <div style={styles.container}>
      <div style={styles.title}>time.is</div>
      <div style={styles.time}>00:00:00</div>
      <button style={styles.btn}>Restart</button>
    </div>
  );
};

export default App;
