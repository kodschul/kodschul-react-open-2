import React, { useState } from "react";
import CardContainer from "./CardContainer";
import ContentSection from "./ContentSection";
import TextSection from "./TextSection";
import { ThemeProvider } from "./theme";

const App = () => {
  const [isDark, setDark] = useState(false);
  return (
    <ThemeProvider value={{ isDark, setDark }}>
      <CardContainer
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

        <TextSection />

        <div
          style={{
            paddingTop: "5%",
            display: "flex",
            alignItems: "center",
            fontSize: 100,
          }}
        ></div>

        <ContentSection
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
    </ThemeProvider>
  );
};

export default App;
