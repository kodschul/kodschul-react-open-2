import { createContext, useContext } from "react";

export type ThemeState = {
  isDark: boolean;
  setDark: (isDark: boolean) => void;
};

// null als Startwert: Wer außerhalb des Providers liest, bekommt einen klaren Fehler.
export const ThemeContext = createContext<ThemeState | null>(null);

// Eigener Hook als einzige Schnittstelle: Komponenten kennen useContext und null-Prüfung nicht.
export const useTheme = (): ThemeState => {
  const theme = useContext(ThemeContext);
  if (theme === null) {
    throw new Error("useTheme muss innerhalb von <ThemeContext value={…}> aufgerufen werden.");
  }
  return theme;
};
