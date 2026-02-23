const CardContainer = ({ isDark, style, children }) => {
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
