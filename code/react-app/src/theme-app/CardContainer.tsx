import React, { useContext } from "react";
import { useTheme } from "./theme";

const CardContainer = ({ children }) => {
  const theme = useTheme();
  return (
    <div
      style={
        theme.isDark
          ? { background: "rgb(0, 0, 0, 0.2)" }
          : { background: "silver" }
      }
    >
      {children}
    </div>
  );
};

export default CardContainer;
