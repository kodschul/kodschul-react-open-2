import React, { useContext } from "react";
import { ThemeContext } from "./theme";

const TextSection = () => {
  const { isDark } = useContext(ThemeContext);
  return <div style={{ color: isDark ? "white" : "black" }}>TextSection</div>;
};

export default TextSection;
