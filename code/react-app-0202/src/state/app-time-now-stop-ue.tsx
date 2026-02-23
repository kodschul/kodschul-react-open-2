import React, { useEffect, useState, useRef } from "react";

const App = () => {
  const [now, setNow] = useState(new Date());
  const [isTimerRunning, setTimerRunning] = useState(true);

  useEffect(() => {
    let timerId: number | undefined = undefined;

    if (isTimerRunning) {
      timerId = setInterval(() => {
        setNow(new Date());
      }, 1000);
    }

    return () => {
      // CLEAN UP
      if (timerId) {
        clearInterval(timerId);
        timerId = undefined;
      }
    };
  }, [isTimerRunning]);

  return (
    <div
      style={{
        height: "100vh",
        width: "100vw",
        backgroundColor: "darkblue",
        display: "flex",
        flexDirection: "column",
        // justifyContent: "center",
        alignItems: "center",

        color: "white",
      }}
    >
      <div style={{ paddingTop: "5%" }}>
        <div style={{ fontSize: 30, fontWeight: "bold" }}>time.is</div>
      </div>

      <div
        style={{
          paddingTop: "5%",
          display: "flex",
          alignItems: "center",
          fontSize: 100,
        }}
        onClick={() => setTimerRunning(false)}
      >
        {now.toLocaleTimeString()}
      </div>

      <button onClick={() => setTimerRunning(true)}>Restart</button>
    </div>
  );
};

export default App;
