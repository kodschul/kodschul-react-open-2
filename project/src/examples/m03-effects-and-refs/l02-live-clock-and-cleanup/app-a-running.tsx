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
  time: { paddingTop: 30, fontSize: 100 },
} satisfies Record<string, CSSProperties>;

// Stufe a: Die Uhr läuft. Der Effekt startet das Intervall und räumt es per Cleanup auf.
const App = () => {
  const [now, setNow] = useState(() => new Date());

  useEffect(() => {
    const timerId = window.setInterval(() => {
      console.log("Tick");
      setNow(new Date());
    }, 1000);

    return () => window.clearInterval(timerId);
  }, []);

  return (
    <div style={styles.container}>
      <div style={styles.title}>time.is</div>
      <div style={styles.time}>{now.toLocaleTimeString("de-DE")}</div>
    </div>
  );
};

export default App;
