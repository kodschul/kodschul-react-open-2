import React from "react";
import { useState } from "react";
import logo from "./logo.svg";
import "./App.css";

function Header() {
  return (
    <header>
      <img src={logo} width={100} alt="logo" />
      <p>
        Edit <code>src/App.tsx</code> and save to reload.
      </p>
      <a
        className="App-link"
        href="https://reactjs.org"
        target="_blank"
        rel="noopener noreferrer"
      >
        Learn React
      </a>
    </header>
  );
}

function App() {
  const [isDark, setDark] = useState(true);

  // let isDarkVar = true;

  const switchTheme = () => {
    // isDark = !isDark;
    setDark(!isDark);
  };

  return (
    <div className={`App ${isDark ? "dark" : "light"}`}>
      <Header />

      <button onClick={switchTheme}>Switch theme</button>
    </div>
  );
}

export default App;
