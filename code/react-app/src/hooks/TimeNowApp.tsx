import { cp } from "fs";
import { useEffect, useRef, useState } from "react";

const TimeNowApp = () => {
  const [now, setNow] = useState(new Date());

  const intervalRef = useRef<any>(null);

  const startTimer = () => {
    intervalRef.current = setInterval(() => {
      setNow(new Date());
    }, 1000);
  };

  useEffect(() => {
    startTimer();
    return () => {
      clearInterval(intervalRef.current);
    };
  }, []);

  const toggleTimer = () => {
    if (intervalRef.current) {
      clearInterval(intervalRef.current);
      intervalRef.current = null;
    } else {
      startTimer();
    }
  };

  return (
    <div style={styles.main}>
      <h1 onClick={toggleTimer}>
        {now.getHours()}:{now.getMinutes()}:{now.getSeconds()}
      </h1>
    </div>
  );
};

const styles: any = {
  main: {
    fontSize: 150,
    minHeight: "100vh",
    width: "100vqw",
    color: "white",
    background: "rgb(0, 0, 46)",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    flexDirection: "column",
  },
};

export default TimeNowApp;
