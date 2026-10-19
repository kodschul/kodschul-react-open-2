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
  title: { fontSize: 30, fontWeight: "bold" },
  time: { paddingTop: 30, fontSize: 80 },
  info: { fontSize: 24, marginBottom: 20 },
  btn: {
    padding: 15,
    border: "2px solid white",
    background: "transparent",
    color: "white",
    cursor: "pointer",
  },
} satisfies Record<string, CSSProperties>;

// Fehlerfall: Der Effekt startet ein Intervall, räumt es aber nie auf.
const Clock = () => {
  const [now, setNow] = useState(() => new Date());
  const [ticks, setTicks] = useState(0);

  useEffect(() => {
    window.setInterval(() => {
      console.log("Tick");
      setNow(new Date());
      setTicks((prev) => prev + 1);
    }, 1000);
  }, []);

  return (
    <>
      <div style={styles.time}>{now.toLocaleTimeString("de-DE")}</div>
      {/* In der Entwicklung (StrictMode) laufen zwei Intervalle: +2 pro Sekunde */}
      <div style={styles.info}>Ticks: {ticks}</div>
    </>
  );
};

const App = () => {
  const [isVisible, setVisible] = useState(true);

  return (
    <div style={styles.container}>
      <div style={styles.title}>time.is (ohne Cleanup)</div>
      {isVisible && <Clock />}
      {/* Nach dem Ausblenden tickt die Konsole weiter: Das Intervall läuft ohne Komponente */}
      <button style={styles.btn} onClick={() => setVisible(!isVisible)}>
        {isVisible ? "Uhr ausblenden" : "Uhr einblenden"}
      </button>
    </div>
  );
};

export default App;
