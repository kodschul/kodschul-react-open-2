import CardContainer from "./CardContainer";
import ThemeToggleButton from "./ThemeToggleButton";

const ContentSection = ({ style, children }) => {
  return (
    <CardContainer style={style}>
      {children}

      <ThemeToggleButton />
    </CardContainer>
  );
};

export default ContentSection;
