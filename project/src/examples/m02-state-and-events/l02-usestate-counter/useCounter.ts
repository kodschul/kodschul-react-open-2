import { useState } from "react";

export const useCounter = () => {
  const [count, setCount] = useState(100);

  const inc = () => setCount(count + 1);
  const dec = () => count > 0 && setCount(count - 1);
  const reset = () => setCount(100);

  return { count, inc, dec, reset };
};
