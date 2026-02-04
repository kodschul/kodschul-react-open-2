import { useEffect, useState } from "react";

const App = () => {
  // let count = 100;
  const [count, setCount] = useState(100);

  // app wurde geladen
  useEffect(() => {
    console.warn("useEffect1: HELLO TO MY APP!");
  }, []);

  useEffect(() => {
    console.warn("useEffect2: count was updated to: ", count);
  }, [count]);

  useEffect(() => {
    console.warn("useEffect 3: something changed! ");
  });

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
          + counter 1
        </div>
        <div
          style={{
            marginTop: 10,
            marginBottom: 10,
            fontSize: 40,
            fontWeight: "bold",
          }}
        >
          Counter1: {count}
          Counter2: {count2}
        </div>
        <div style={styles.btn} onClick={() => setCount2(count2 + 1)}>
          + counter 2
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
