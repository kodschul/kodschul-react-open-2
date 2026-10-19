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

// TODO 1: Ref für das Eingabefeld anlegen, anhängen und im Effekt fokussieren.
// TODO 2: Ref als Klickzähler anlegen, im Klick-Handler erhöhen und dort loggen.
const App = () => {
  return (
    <div style={styles.container}>
      <div style={styles.title}>Input App</div>
      <input style={styles.input} type="text" placeholder="Tippe etwas ein …" />
      <div style={styles.title}>Counter App</div>
      <div style={styles.value}>0</div>
      <div style={{ display: "flex", gap: 12 }}>
        <button style={styles.btn}>+</button>
        <button style={styles.btn}>–</button>
      </div>
    </div>
  );
};

export default App;
