import { useState } from "react";

function CounterApp() {
  console.log("FUNC WAS CALLED");
  const [count, setCount] = useState(10);

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
      <div>Count: {count}</div>
      <button onClick={dec}>-</button>
    </div>
  );
}

export default CounterApp;
