import React, { useContext } from "react";
import { ThemeContext } from "./theme";

const ThemeToggleButton = () => {
  const { isDark, setDark } = useContext(ThemeContext);
  return (
    <button onClick={() => setDark(!isDark)}>
      {isDark ? "Switch light on" : "Switch light off"}
    </button>
  );
};

export default ThemeToggleButton;
