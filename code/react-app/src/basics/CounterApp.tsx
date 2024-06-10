import { useState } from "react";

const CounterApp = () => {
  const [count, setCount] = useState(0);

  const countUp = () => {
    setCount(count + 1);
  };

  const countDown = () => {
    setCount(count - 1);
  };

  return (
    <div style={styles.main}>
      <h1>Counter App</h1>

      <div style={styles.btn} onClick={countUp}>
        +
      </div>

      <h2>{count}</h2>

      <div style={styles.btn} onClick={countDown}>
        -
      </div>
    </div>
  );
};

const styles: any = {
  main: {
    height: "100vh",
    width: "100vw",
    color: "white",
    background: "rgb(0, 0, 46)",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    flexDirection: "column",
  },
  btn: {
    cursor: "pointer",
    userSelect: "none",

    fontSize: 30,
    fontWeight: "500",
    borderWidth: 2,
    padding: 5,
    paddingLeft: 10,
    paddingRight: 10,
    borderColor: "white",
    // borderColor: "#0d1259",
    borderStyle: "solid",
  },
};

export default CounterApp;
