import React, { useEffect, useState, useRef } from "react";

const App = () => {
  const [now, setNow] = useState(new Date());

  const nowTimerRef = useRef<number>(null);

  useEffect(() => {
    nowTimerRef.current = setInterval(() => {
      setNow(new Date());
    }, 1000);

    return () => {
      nowTimerRef.current && clearInterval(nowTimerRef.current);
    };
  }, []);

  const stopTimer = () => {
    nowTimerRef.current && clearInterval(nowTimerRef.current);
  };

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
        onClick={stopTimer}
      >
        {now.toLocaleTimeString()}
      </div>
    </div>
  );
};

export default App;
