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
  },
  title: { fontSize: 30, fontWeight: "bold" },
  time: { paddingTop: 30, fontSize: 100, cursor: "pointer" },
} satisfies Record<string, CSSProperties>;

// Stufe b: Ein Klick stoppt die Uhr. Die Timer-ID liegt in einem Ref (mehr dazu in Lab 3.3).
// Grenze: Der Effekt läuft nur einmal, ein Neustart ist so nicht möglich (siehe index.tsx).
const App = () => {
  const [now, setNow] = useState(() => new Date());
  const timerIdRef = useRef<number | undefined>(undefined);

  useEffect(() => {
    timerIdRef.current = window.setInterval(() => {
      console.log("Tick");
      setNow(new Date());
    }, 1000);

    return () => window.clearInterval(timerIdRef.current);
  }, []);

  const stopTimer = () => {
    window.clearInterval(timerIdRef.current);
  };

  return (
    <div style={styles.container}>
      <div style={styles.title}>time.is (Klick stoppt)</div>
      <div style={styles.time} onClick={stopTimer}>
        {now.toLocaleTimeString("de-DE")}
      </div>
    </div>
  );
};

export default App;
