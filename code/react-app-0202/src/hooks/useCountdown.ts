import { useEffect, useState } from "react";

const useCountdown = ({ interval = 1000 }) => {
  const [isTimerRunning, setTimerRunning] = useState(false);
  const [secsLeft, setSecsLeft] = useState(-1);

  useEffect(() => {
    let timerId: number | undefined = undefined;

    if (isTimerRunning) {
      timerId = setInterval(() => {
        setSecsLeft((prevState) => prevState - 1);
      }, interval);
    }

    return () => {
      // CLEAN UP
      if (timerId) {
        clearInterval(timerId);
        timerId = undefined;
      }
    };
  }, [isTimerRunning]);

  useEffect(() => {
    if (secsLeft === 0) {
      setTimerRunning(false);
    }
  }, [secsLeft]);

  const start = (duration) => {
    setSecsLeft(duration);
    setTimerRunning(true);
  };
  const stop = () => setTimerRunning(false);

  return { start, stop, secsLeft };
};

export default useCountdown;
