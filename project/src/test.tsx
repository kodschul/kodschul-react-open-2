import { useEffect, useState } from "react";

export const useTime = () => {
  const [inputSecs, setInputSecs] = useState(10);
  const [secsLeft, setSecsLeft] = useState(10);
  const [isRunning, setRunning] = useState(false);

  const isExpired = secsLeft === 0;
  const isTicking = isRunning && secsLeft > 0;

  useEffect(() => {
    let timerId = null;

    if (isRunning) {
      timerId = window.setInterval(() => {
        setSecsLeft((prev) => prev - 1); // funktionales Update: immer der aktuelle Wert
      }, 1000);
    }

    return () => {
      timerId && clearInterval(timerId);
    };
  }, [isRunning]);

  const start = () => {
    setSecsLeft(inputSecs);
    setRunning(true);
  };

  const stop = () => {
    setRunning(false);
  };

  return {
    inputSecs,
    secsLeft,
    isRunning,
    start,
    setInputSecs,
    isExpired,
    stop,
  };
};
