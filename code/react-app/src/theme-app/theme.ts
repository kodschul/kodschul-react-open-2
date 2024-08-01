import { createContext, useContext } from "react";

type Theme = {
  isDark: boolean;
  setDark: (isDark: boolean) => void;
};

export const ThemeContext = createContext<Theme>({
  isDark: true,
  setDark: () => {},
});

export const useTheme = () => useContext(ThemeContext);
