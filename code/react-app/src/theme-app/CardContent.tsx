import React, { useContext } from "react";
import CardContainer from "./CardContainer";

const CardContent = () => {
  return (
    <div style={{ maxWidth: "30%" }}>
      <CardContainer>
        <h3>Main content</h3>
        <p>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Duis tempus
          enim sit amet elit interdum, sit amet egestas augue porta. Nunc
          commodo tristique velit ac maximus. Proin facilisis est vitae lectus
          volutpat, ac suscipit dui finibus. Pellentesque condimentum malesuada
          libero quis finibus. Praesent condimentum viverra quam, ac vestibulum
          lacus cursus ac. Sed consequat consectetur eros, sed tincidunt nibh
          vehicula a. Curabitur a eros lacus. Curabitur nec justo augue.
        </p>
      </CardContainer>
    </div>
  );
};

export default CardContent;
