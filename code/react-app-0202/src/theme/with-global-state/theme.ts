import { createContext, useContext } from "react";

type ThemeState = {
  isDark: boolean;
  setDark: (isDark: boolean) => unknown;
};

export const ThemeContext = createContext<ThemeState>({
  isDark: false,
  setDark: () => {},
});

export const ThemeProvider = ThemeContext.Provider;

export const useTheme = () => useContext(ThemeContext);
