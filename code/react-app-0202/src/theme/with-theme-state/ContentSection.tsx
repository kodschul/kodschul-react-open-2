import CardContainer from "./CardContainer";
import ThemeToggleButton from "./ThemeToggleButton";

const ContentSection = ({ isDark, setDark, style, children }) => {
  return (
    <CardContainer isDark={isDark} style={style}>
      {children}

      <ThemeToggleButton isDark={isDark} setDark={setDark} />
    </CardContainer>
  );
};

export default ContentSection;
