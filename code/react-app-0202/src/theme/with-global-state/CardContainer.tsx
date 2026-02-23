import { useTheme } from "./theme";

const CardContainer = ({ style, children }) => {
  const { isDark } = useTheme();
  return (
    <div
      style={{
        backgroundColor: isDark ? "#22262b" : "#bfc7d4",
        color: isDark ? "white" : "black",
        ...style,
      }}
    >
      {children}
    </div>
  );
};

export default CardContainer;
