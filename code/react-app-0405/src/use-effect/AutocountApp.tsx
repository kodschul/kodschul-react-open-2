import { useState, useRef, useEffect } from "react";

function AutoCounterApp() {
  const [count, setCount] = useState(10);

  const [isRunning, setRunning] = useState(true);

  useEffect(() => {
    let timerId;

    if (isRunning) {
      timerId = setInterval(() => {
        // setCount(count + 1);
        setCount((prev) => prev + 1);
      }, 1000);
    }
    return () => {
      console.log("CLEAR_INTERVAL");

      if (timerId) {
        clearInterval(timerId);
      }
    };
  }, [isRunning]);

  useEffect(() => {
    if (count == 15) {
      setRunning(false);
    }
  }, [count]);

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
      <button onClick={() => setRunning(false)}>Stop</button>
      <button onClick={() => setRunning(true)}>Play</button>
      <button onClick={inc}>+</button>
      <div>Count: {count}</div>
      <button onClick={dec}>-</button>
    </div>
  );
}

export default AutoCounterApp;
