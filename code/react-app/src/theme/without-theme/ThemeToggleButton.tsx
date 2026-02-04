import React from "react";

const ThemeToggleButton = ({ isDark, setDark }) => {
  return (
    <button onClick={() => setDark(!isDark)}>
      {isDark ? "Switch light on" : "Switch light off"}
    </button>
  );
};

export default ThemeToggleButton;
