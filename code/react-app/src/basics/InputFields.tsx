import React, { useEffect, useRef, useState } from "react";

const InputFields = () => {
  const [username, setUsername] = useState("");

  const inputRef = useRef<any>();

  const handleUsername = (e: React.ChangeEvent<HTMLInputElement>) => {
    let text = e.target.value;
    if (/\d/.test(text)) {
      return;
    }

    setUsername(text);
  };

  useEffect(() => {
    inputRef.current.focus();
  }, []);

  return (
    <div
      style={{
        height: "100vh",
        width: "100vw",
        color: "white",
        background: "rgb(0, 0, 46)",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        flexDirection: "column",
      }}
    >
      {true && (
        <>
          <h1>Input Fields</h1>
          <input
            // ref={inputRef}
            // value={username}
            placeholder="Enter username"
            // onChange={handleUsername}
            style={{
              padding: 10,
              backgroundColor: "transparent",
              color: "white",
              fontSize: 16,
              fontWeight: "400",
            }}
          />

          <input
            ref={inputRef}
            // value={username}
            placeholder="Enter username"
            // onChange={handleUsername}
            style={{
              padding: 10,
              backgroundColor: "transparent",
              color: "white",
              fontSize: 16,
              fontWeight: "400",
            }}
          />
        </>
      )}

      <button onClick={() => alert(inputRef.current.value)}>
        Get username{" "}
      </button>

      <div>Welcome back {username}!</div>

      <button onClick={() => setUsername("")}>Clear</button>
    </div>
  );
};

export default InputFields;
