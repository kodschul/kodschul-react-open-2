import React from "react";

const TextSection = ({ isDark }) => {
  return <div style={{ color: isDark ? "white" : "black" }}>TextSection</div>;
};

export default TextSection;
