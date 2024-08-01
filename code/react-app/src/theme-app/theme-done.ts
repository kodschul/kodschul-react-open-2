import { createContext, useContext } from "react";

export const ThemeContext = createContext({
  isDark: true,
  setDark: (isDark: boolean): any => null,
});

export const useTheme = () => useContext(ThemeContext);
