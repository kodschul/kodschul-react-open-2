const CardContainer = ({ style, children }) => {
  return (
    <div
      style={{
        backgroundColor: "#bfc7d4",
        color: "black",
        ...style,
      }}
    >
      {children}
    </div>
  );
};

export default CardContainer;
