import React, { useEffect, useState, useRef } from "react";
import CardContainer from "./CardContainer";
import ContentSection from "./ContentSection";
import ThemeToggleButton from "./ThemeToggleButton";
import TextSection from "./TextSection";

const App = () => {
  const [isDark, setDark] = useState(false);
  return (
    <CardContainer
      isDark={isDark}
      style={{
        height: "100vh",
        width: "100vw",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
      }}
    >
      <div style={{ paddingTop: "5%" }}>
        <div style={{ fontSize: 30, fontWeight: "bold" }}>Theme App</div>
      </div>

      <TextSection isDark={isDark} />

      <div
        style={{
          paddingTop: "5%",
          display: "flex",
          alignItems: "center",
          fontSize: 100,
        }}
      ></div>

      <ContentSection
        isDark={isDark}
        setDark={setDark}
        style={{
          width: "50vw",
          height: "50vh",
          borderWidth: 2,
          borderColor: "red",
          borderStyle: "solid",
        }}
      >
        <p>This is another section</p>
      </ContentSection>
    </CardContainer>
  );
};

export default App;
