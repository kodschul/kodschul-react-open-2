import React from "react";

const CounterAppBasics = () => {
  return (
    <div
      style={{
        backgroundColor: "darkblue",
        height: "100vh",
        width: "100vw",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        flexDirection: "column",

        color: "white",
      }}
    >
      <h1>Counter App Basics</h1>

      <button>+</button>
      <div style={{ margin: 10 }}>Count: 0</div>

      <button>-</button>
    </div>
  );
};

export default CounterAppBasics;
