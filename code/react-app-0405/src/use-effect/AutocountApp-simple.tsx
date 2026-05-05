import { useState, useRef, useEffect } from "react";

function AutoCounterApp() {
  const [count, setCount] = useState(10);

  useEffect(() => {
    const timerId = setInterval(() => {
      // setCount(count + 1);
      setCount((prev) => prev + 1);
    }, 1000);

    return () => {
      console.log("CLEAR_INTERVAL");
      clearInterval(timerId);
    };
  }, []);

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

export default AutoCounterApp;
