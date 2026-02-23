import React, { useEffect, useState, useRef } from "react";

const App = () => {
  const inputRef = useRef<HTMLInputElement>(null);
  const [inputValue, setInputValue] = useState("");
  // // react variant
  useEffect(() => {
    inputRef.current?.focus?.();
  }, []);

  //vanilla html
  // useEffect(() => {
  //   document.getElementById("inputElement")?.focus();
  // }, []);

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
        <div style={{ fontSize: 30, fontWeight: "bold" }}>Input App</div>
      </div>

      <div style={{ paddingTop: "5%", display: "flex", alignItems: "center" }}>
        <input
          ref={inputRef}
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
          // id="inputElement"
          type="text"
          placeholder="Type something here..."
        />
      </div>

      <div>Input value is: {inputValue}</div>

      <button onClick={() => setInputValue("")}>Clear</button>
    </div>
  );
};

export default App;
