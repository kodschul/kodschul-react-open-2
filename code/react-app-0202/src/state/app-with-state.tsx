import { useState } from "react";

const App = () => {
  console.warn("RENDERING");
  // let count = 100;
  const [count, setCount] = useState(100);
  const countUp = () => {
    setCount(count + 1);
    console.warn("UP", count);
  };
  const countDown = () => {
    setCount(count - 1);
    console.warn("DOWN", count);
  };
  return (
    <div style={styles.container}>
      <div style={{ fontSize: 40, fontWeight: "bold" }}>Counter App</div>
      <div>
        <div style={styles.btn} onClick={countUp}>
          + CountUp
        </div>
        <div
          data-testid="countValue"
          style={{
            marginTop: 10,
            marginBottom: 10,
            fontSize: 40,
            fontWeight: "bold",
          }}
        >
          {count}
        </div>
        <div style={styles.btn} onClick={countDown}>
          -
        </div>
      </div>
    </div>
  );
};

const styles = {
  container: {
    flex: 1,
    display: "flex",
    flexDirection: "column",
    backgroundColor: "darkblue",
    width: "100vw",
    height: "100vh",
    color: "White",
    alignItems: "center",
    paddingTop: 50,
  },

  btn: {
    padding: 20,
    borderWidth: 2,
    borderStyle: "solid",
    borderColor: "white",
    display: "flex",
    justifySelf: "start",
    cursor: "pointer",
  },
};

export default App;
