import { useState } from "react";
import CardContainer from "./CardContainer";
import TextSection from "./TextSection";
import { ThemeContext } from "./theme-context";

const STORAGE_KEY = "theme";

// Erweiterung: Das Theme überlebt ein Neuladen der Seite.
const App = () => {
  // Der Startwert kommt einmalig aus dem localStorage (Initializer-Funktion).
  const [isDark, setIsDark] = useState(() => localStorage.getItem(STORAGE_KEY) === "dark");

  // Speichern passiert im Handler, nicht in einem Effekt.
  const setDark = (value: boolean) => {
    setIsDark(value);
    localStorage.setItem(STORAGE_KEY, value ? "dark" : "light");
  };

  return (
    <ThemeContext value={{ isDark, setDark }}>
      <main className="p-8">
        <CardContainer>
          <h1 className="text-3xl font-bold">Theme App (mit localStorage)</h1>
          <TextSection />
        </CardContainer>
      </main>
    </ThemeContext>
  );
};

export default App;
