import React, { useEffect, useState, useRef } from "react";
import useCountdown from "./useCountdown";

const App = () => {
  const [timeSecs, setTimeSecs] = useState(3);

  const { start, stop, secsLeft } = useCountdown({
    interval: 2000,
  });

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

        <button onClick={() => start(timeSecs)}>Start</button>
        <button onClick={stop}>Stop</button>
      </div>
    </div>
  );
};

export default App;
