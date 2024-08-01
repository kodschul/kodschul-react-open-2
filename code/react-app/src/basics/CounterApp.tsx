import React, { useEffect, useState } from "react";
import css from "./CounterApp.module.css";
import "./CounterApp.css";

let timerId: any = null;

const CounterApp = () => {
  const [counter, setCounter] = useState(10);

  const countUp = () => {
    setCounter((counter) => counter + 1);
    console.log("up: ", counter);
  };
  const countDown = () => {
    setCounter((counter) => counter - 1);
    console.log("down: ", counter);
  };

  // useEffect(() => {
  //   timerId = setInterval(() => {
  //     countDown();
  //     console.log("count up");
  //   }, 1000);

  //   return () => {
  //     console.log("CLEAR_TIMER");
  //     clearInterval(timerId);
  //   };
  // }, []);

  // useEffect(() => {
  //   if (counter == 0 && timerId) {
  //     clearInterval(timerId);
  //     timerId = null;
  //   }
  // }, [counter]);

  // useEffect(() => {
  //   let timerId = setInterval(() => {
  //     countUp();
  //     console.log("count up");
  //   }, 1000);

  //   return () => {
  //     console.log("CLEAR_TIMER");
  //     clearInterval(timerId);
  //   };
  // });

  useEffect(() => {
    if (counter === 0) {
      return;
    }

    let timerId = setInterval(() => {
      countDown();
      console.log("count up");
    }, 1000);

    return () => {
      console.log("CLEAR_TIMER");
      clearInterval(timerId);
    };
  }, [counter]);

  return (
    <div
      style={{
        ...styles.main,
        // background: isActive ? styles.main.background : "red",
      }}
    >
      <h1>Counter App</h1>

      <div style={styles.btn} onClick={countUp}>
        +
      </div>

      <h2>{counter}</h2>

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
