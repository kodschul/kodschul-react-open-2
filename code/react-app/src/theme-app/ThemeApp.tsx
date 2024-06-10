import { useEffect, useState, createContext, useContext } from "react";
import SwitchThemeButton from "./SwitchThemeButton";
import CardContent from "./CardContent";
import { ThemeContext } from "./theme";

const ThemeApp = () => {
  const theme = useContext(ThemeContext);

  return (
    <div
      style={{
        ...styles.main,
        ...(!theme.isDark && styles.mainLightMode),
      }}
    >
      <h1>Theme App</h1>
      <CardContent />
      <p>Theme: {theme.isDark ? "Dark Mode" : "Light Mode"}</p>
      <SwitchThemeButton />
    </div>
  );
};

const App = () => {
  const [isDark, setDark] = useState(true);

  return (
    <ThemeContext.Provider value={{ isDark: isDark, setDark: setDark }}>
      <ThemeApp />
    </ThemeContext.Provider>
  );
};

const styles: any = {
  main: {
    minHeight: "100vh",
    width: "100vqw",
    color: "white",
    background: "rgb(0, 0, 46)",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    flexDirection: "column",
  },
  mainLightMode: {
    background: "white",
    color: "black",
  },
};

export default App;
