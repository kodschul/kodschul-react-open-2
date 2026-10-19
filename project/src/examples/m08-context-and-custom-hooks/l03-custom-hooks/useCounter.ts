import { useState } from "react";

// Erweiterung: die Logik des Counters aus Lab 2.2 als Hook.
export const useCounter = (initialValue = 0) => {
  const [count, setCount] = useState(initialValue);

  const increment = () => setCount((prev) => prev + 1);
  const decrement = () => setCount((prev) => Math.max(0, prev - 1));
  const reset = () => setCount(initialValue);

  return { count, increment, decrement, reset };
};
