import { useState } from "react";
import styled from "styled-components";

const StyledComponents = () => {
  const [isDark, setDark] = useState(false);
  return (
    <Container dark={isDark}>
      <h1>Theme App</h1>

      <Button onClick={() => setDark(!isDark)}>On/Off</Button>
    </Container>
  );
};

const Container = styled.div<{ dark: boolean }>`
  min-height: 100vh;
  width: 100vw;
  color: ${(props) => (props.dark ? "white" : "red")};
  background: rgb(0, 0, 46);
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;

  @media (max-width: 500px) {
    background: red;
  }
`;

const Button = styled.button<{ primary?: boolean }>`
  background: "blue";
`;

export default StyledComponents;
