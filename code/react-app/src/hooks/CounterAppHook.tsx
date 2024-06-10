import { useState } from "react";
import useCounter from "./useCounter";

const CounterAppHook = () => {
  const { count, countDown, countUp } = useCounter(1, 2);

  return (
    <div style={styles.main}>
      <h1>Counter App Hook</h1>

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

export default CounterAppHook;
