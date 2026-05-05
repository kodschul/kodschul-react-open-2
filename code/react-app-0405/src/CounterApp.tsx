import { useState, useRef } from "react";

function CounterApp() {
  const [count, setCount] = useState(10);

  const redenderCountRef = useRef(0);
  redenderCountRef.current = redenderCountRef.current + 1;
  console.log({ renders: redenderCountRef.current });

  const inc = () => {
    setCount(count + 1);
    console.log("INC");
  };

  const dec = () => {
    setCount(count - 1);
    console.log("DEC");
  };

  return (
    <div>
      <div>CounterApp</div>
      <button onClick={inc}>+</button>
      <div>Count 2: {count}</div>
      <button onClick={dec}>-</button>
    </div>
  );
}

export default function Component() {
  return (
    <>
      <CounterApp />
      <CounterApp />
    </>
  );
}
