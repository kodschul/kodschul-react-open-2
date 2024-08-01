const SwitchThemeButton = ({ isDark, setDark }) => {
  return (
    <button onClick={() => setDark(!isDark)}>
      {isDark ? "Switch lights on" : "Switch lights off"}
    </button>
  );
};

export default SwitchThemeButton;
