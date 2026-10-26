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
  time: { padding: "30px 0", fontSize: 100, cursor: "pointer" },
  btn: {
    padding: 15,
    border: "2px solid white",
    background: "transparent",
    color: "white",
    cursor: "pointer",
  },
} satisfies Record<string, CSSProperties>;

// Stufe c: Start und Stopp laufen über State. Ändert sich isRunning, räumt React den
// alten Effekt per Cleanup auf und führt den Effekt mit dem neuen Wert erneut aus.
const App = () => {
  const [now, setNow] = useState(() => new Date());
  const [isRunning, setRunning] = useState(true);

  useEffect(() => {
    // console.log("new timer was created");
    let timerId = undefined;

    if (isRunning) {
      timerId = setInterval(() => {
        console.log("Tick");
        setNow(new Date());
      }, 1000);
    }

    return () => {
      // console.log("old timer was cleared");
      timerId && clearInterval(timerId);
    };
  }, [isRunning]);

  return (
    <div style={styles.container}>
      <div style={styles.title}>time.is</div>
      <div style={styles.time} onClick={() => setRunning(false)}>
        {now.toLocaleTimeString("de-DE")}
      </div>
      <button
        style={styles.btn}
        onClick={() => setRunning(true)}
        disabled={isRunning}
      >
        Restart
      </button>

      <button onClick={() => setRunning(!isRunning)}>
        is Running: {String(isRunning)}
      </button>
    </div>
  );
};

export default App;
