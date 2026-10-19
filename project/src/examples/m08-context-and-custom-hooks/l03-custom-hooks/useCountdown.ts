import { useEffect, useState } from "react";

type UseCountdownOptions = {
  interval?: number;
};

export const useCountdown = ({ interval = 1000 }: UseCountdownOptions = {}) => {
  const [secsLeft, setSecsLeft] = useState(-1);
  const [isActive, setIsActive] = useState(false);

  // Abgeleiteter Wert: Bei 0 läuft der Countdown nicht mehr, ohne zweiten Effekt.
  const isRunning = isActive && secsLeft > 0;

  useEffect(() => {
    if (!isRunning) return;
    const timerId = setInterval(() => setSecsLeft((prev) => prev - 1), interval);
    return () => clearInterval(timerId);
  }, [isRunning, interval]);

  const start = (duration: number) => {
    setSecsLeft(duration);
    setIsActive(true);
  };
  const stop = () => setIsActive(false);

  return { secsLeft, isRunning, start, stop };
};
