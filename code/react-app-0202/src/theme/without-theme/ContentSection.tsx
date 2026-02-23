import CardContainer from "./CardContainer";

const ContentSection = ({ style, children }) => {
  return <CardContainer style={style}> {children} </CardContainer>;
};

export default ContentSection;
