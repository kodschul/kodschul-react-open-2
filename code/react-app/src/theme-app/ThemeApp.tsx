import { useState } from "react";
import { useTheme, ThemeContext } from "./theme";

const MyApp = () => {
  const theme = useTheme();
  return (
    <div
      style={{
        ...styles.main,
        ...(!theme.isDark && styles.mainLightMode),
      }}
    >
      <h1>Theme App</h1>

      <p>Theme: {theme.isDark ? "Dark Mode" : "Light Mode"}</p>
    </div>
  );
};

const App = () => {
  const [isDark, setDark] = useState(true);

  return (
    <>
      <ThemeContext.Provider value={{ isDark, setDark }}>
        <MyApp />
      </ThemeContext.Provider>
    </>
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
