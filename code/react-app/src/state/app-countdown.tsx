import { useEffect, useRef, useState } from "react";

const CountDownApp = () => {
  const [now, setNow] = useState(new Date());

  const [isTimeout, setIsTimeout] = useState(false);

  const inputRef = useRef<any>(null);

  const startTimeout = () => {
    let timeoutInSecs = parseInt(inputRef.current.value);

    setIsTimeout(false);
    setTimeout(() => {
      setIsTimeout(true);
      inputRef.current.value = 0;
    }, timeoutInSecs * 1000);
  };

  return (
    <div style={{ ...styles.main, ...(isTimeout && { background: "red" }) }}>
      <input
        ref={inputRef}
        type="number"
        // value={timeoutInSecs}
        // @ts-ignore
        // onChange={(e) => setTimeoutInSeconds(parseInt(e.target.value))}
        style={styles.input}
      />

      <button onClick={startTimeout}> Start Timeout </button>
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
  input: {
    fontSize: 150,
    background: "rgb(0, 0, 46)",
    color: "white",
  },
};

export default CountDownApp;
