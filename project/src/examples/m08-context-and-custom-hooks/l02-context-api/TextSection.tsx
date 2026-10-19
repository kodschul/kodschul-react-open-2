import { useTheme } from "./theme-context";

const TextSection = () => {
  const { isDark } = useTheme();
  return <p className={isDark ? "text-yellow-300" : "text-blue-800"}>Dieser Text liest isDark aus dem Context.</p>;
};

export default TextSection;
