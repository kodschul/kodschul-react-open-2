import { createContext, useContext } from "react";

export type ThemeState = {
  isDark: boolean;
  setDark: (isDark: boolean) => void;
};

export const ThemeContext = createContext<ThemeState>({
  isDark: true,
  setDark: () => {},
});

export const useTheme = () => useContext(ThemeContext);
