import { useTheme } from "./theme-done";

const SwitchThemeButton = () => {
  const { isDark, setDark } = useTheme();
  return (
    <button onClick={() => setDark(!isDark)}>
      {isDark ? "Switch lights on" : "Switch lights off"}
    </button>
  );
};

export default SwitchThemeButton;
