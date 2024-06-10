import { useEffect, useState } from "react";

const UseEffectApp = () => {
  const [username, setUsername] = useState("mike");
  const [usernameText, setUsernameText] = useState("");

  let x = 5;

  // fired on every re-render
  useEffect(() => {
    console.log("Updated!");
    x += 2;

    console.log(x);
  });

  // fired on load
  useEffect(() => {
    console.log("Welcome!");
  }, []);

  // fired on username changed
  useEffect(() => {
    console.log("Send a GET request to API", { username });
  }, [username]);

  return (
    <div style={styles.main}>
      <h1>UseEffectApp</h1>
      {/* 
      <button onClick={() => setUsername("alice")}>Set Alice</button>
      <button onClick={() => setUsername("bob")}>Set Bob</button> */}

      <input
        type="text"
        placeholder="Enter username"
        value={usernameText}
        onChange={(e) => setUsernameText(e.target.value)}
      />
      <button onClick={() => setUsername(usernameText)}>Fetch User</button>
    </div>
  );
};

const styles: any = {
  main: {
    minHeight: "100vh",
    width: "100vqw",
    color: "white",
    background: "rgb(0, 0, 46)",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    flexDirection: "column",
  },
};

export default UseEffectApp;
