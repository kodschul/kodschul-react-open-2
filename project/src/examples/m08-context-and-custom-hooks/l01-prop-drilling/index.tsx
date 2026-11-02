import { useState } from "react";
import CardContainer from "./CardContainer";
import TextSection from "./TextSection";
import { ThemeContext } from "./theme";

// Der State liegt in der App. Von hier führt der Weg zum Button über drei Ebenen:
// CardContainer → ContentSection → ThemeToggleButton
const App = () => {
  const [isDark, setDark] = useState(false);

  return (
    <ThemeContext.Provider value={{ isDark, setDark }}>
      <main className="p-8">
        <CardContainer>
          <h1 className="stext-3xl font-bold">Theme App</h1>
          <TextSection />
        </CardContainer>
      </main>
    </ThemeContext.Provider>
  );
};

export default App;
