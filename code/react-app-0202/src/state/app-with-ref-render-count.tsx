import { useRef, useState } from "react";

const App = () => {
  const clickCountRef = useRef(0);

  // let count = 100;
  const [count, setCount] = useState(100);
  const countUp = () => {
    setCount(count + 1);

    clickCountRef.current += 1;
  };
  const countDown = () => {
    setCount(count - 1);

    clickCountRef.current += 1;
  };

  console.warn(`Du hast ${clickCountRef?.current} geklickt`);

  return (
    <div style={styles.container}>
      <div style={{ fontSize: 40, fontWeight: "bold" }}>Counter App</div>
      <div>
        <div style={styles.btn} onClick={countUp}>
          +
        </div>
        <div
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
