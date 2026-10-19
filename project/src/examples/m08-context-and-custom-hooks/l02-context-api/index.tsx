import { useState } from "react";
import CardContainer from "./CardContainer";
import TextSection from "./TextSection";
import { ThemeContext } from "./theme-context";

// React 19: Der Context ist selbst der Provider. Älterer Code schreibt <ThemeContext.Provider value={…}>.
const App = () => {
  const [isDark, setDark] = useState(false);

  return (
    <ThemeContext value={{ isDark, setDark }}>
      <main className="p-8">
        <CardContainer>
          <h1 className="text-3xl font-bold">Theme App</h1>
          <TextSection />
        </CardContainer>
      </main>
    </ThemeContext>
  );
};

export default App;
