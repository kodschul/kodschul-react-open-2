import React, { useEffect, useRef, useState } from "react";

// let x = 0;

const useCounter = (steps = 1, initialValue = 0) => {
  const [counter, setCounter] = useState(initialValue);

  const countUp = () => {
    setCounter((counter) => counter + steps);
  };
  const countDown = () => {
    setCounter((counter) => counter - steps);
  };

  const calculate = () => {
    //
  };

  // useEffect(() => {
  //   console.log(counter);
  // }, [counter]);

  return { counter, countUp, countDown, calculate };
};

const App1 = () => {
  const { counter, countUp, countDown } = useCounter(1, 0);

  // const [counter, setCounter] = useState(0);

  // const countUp = () => {
  //   setCounter((counter) => counter + 1);
  // };
  // const countDown = () => {
  //   setCounter((counter) => counter - 1);
  // };

  return (
    <div style={styles.main}>
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

const App2 = () => {
  const { counter, countUp, countDown } = useCounter(2, 0);

  // const [counter, setCounter] = useState(0);

  // const countUp = () => {
  //   setCounter((counter) => counter + 2);
  // };
  // const countDown = () => {
  //   setCounter((counter) => counter - 2);
  // };

  return (
    <div style={styles.main}>
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

const App = () => {
  return (
    <>
      <App1 />
      <App2 />
    </>
  );
};

const styles: any = {
  main: {
    height: "50vh",
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

export default App;
