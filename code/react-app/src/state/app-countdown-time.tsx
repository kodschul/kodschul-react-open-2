import React, { useEffect, useState, useRef } from "react";

const App = () => {
  const [timeSecs, setTimeSecs] = useState(3);
  const [isTimerRunning, setTimerRunning] = useState(false);
  const [secsLeft, setSecsLeft] = useState(-1);

  useEffect(() => {
    let timerId: number | undefined = undefined;

    if (isTimerRunning) {
      timerId = setInterval(() => {
        setSecsLeft((prevState) => prevState - 1);
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

  useEffect(() => {
    if (secsLeft === 0) {
      setTimerRunning(false);
    }
  }, [secsLeft]);

  return (
    <>
      <div
        className="div1"
        style={{ width: 100, height: 100, backgroundColor: "yellow" }}
      ></div>
      <div
        className="div2"
        style={{ width: 100, height: 100, backgroundColor: "red" }}
      ></div>
    </>
  );

  return (
    <div
      style={{
        height: "100vh",
        width: "100vw",
        backgroundColor: secsLeft == 0 ? "red" : "darkblue",
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
      >
        {secsLeft >= 0 && <div style={{ fontSize: 100 }}>{secsLeft}</div>}
        <input
          value={timeSecs}
          type="number"
          style={{ fontSize: 40 }}
          onChange={(e) => setTimeSecs(e.target.valueAsNumber)}
        />

        <button
          onClick={() => {
            setSecsLeft(timeSecs);
            setTimerRunning(true);
          }}
        >
          Start
        </button>

        <button onClick={() => setTimerRunning(false)}>Stop</button>
      </div>
    </div>
  );
};

export default App;
