import { useState } from "react";
import CardContainer from "./CardContainer";
import TextSection from "./TextSection";

// Der State liegt in der App. Von hier führt der Weg zum Button über drei Ebenen:
// CardContainer → ContentSection → ThemeToggleButton
const App = () => {
  const [isDark, setDark] = useState(false);

  return (
    <main className="p-8">
      <CardContainer isDark={isDark} setDark={setDark}>
        <h1 className="text-3xl font-bold">Theme App</h1>
        <TextSection isDark={isDark} />
      </CardContainer>
    </main>
  );
};

export default App;
