import { useTheme } from "./theme-context";

// Keine Props mehr: Der Button holt sich isDark und setDark direkt aus dem Context.
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
