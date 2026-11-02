import { useTheme } from "./theme";

// Ebene 3: Der Button braucht beide Props wirklich.
const ThemeToggleButton = () => {
  const { isDark, setDark } = useTheme();

  return (
    <button
      className="rounded border-2 border-current px-4 py-2 hover:opacity-70"
      onClick={() => setDark(!isDark)}
    >
      {isDark ? "Licht an" : "Licht aus"}
    </button>
  );
};

export default ThemeToggleButton;
