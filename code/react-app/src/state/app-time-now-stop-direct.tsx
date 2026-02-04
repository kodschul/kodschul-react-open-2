import React, { useEffect, useState, useRef } from "react";

const App = () => {
  const [now, setNow] = useState(new Date());

  let timerIdRef = useRef(null);
  useEffect(() => {
    timerIdRef.current = setInterval(() => {
      setNow(new Date());
    }, 1000);
  }, []);

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
        onClick={() => clearInterval(timerIdRef.current)}
      >
        {now.toLocaleTimeString()}
      </div>
    </div>
  );
};

export default App;
