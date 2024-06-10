import React, { useState } from "react";

const useCounter = (initialValue, step = 1) => {
  const [count, setCount] = useState(initialValue);

  const countUp = () => {
    setCount(count + step);
  };

  const countDown = () => {
    setCount(count - step);
  };

  return { count, countUp, countDown };
};

export default useCounter;
