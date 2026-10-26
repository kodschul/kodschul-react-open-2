import { useEffect, useState, type CSSProperties } from "react";

const styles = {
  container: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    minHeight: "100vh",
    backgroundColor: "darkblue",
    color: "white",
    paddingTop: 50,
  },
  title: { fontSize: 30, fontWeight: "bold" },
  time: { padding: "30px 0", fontSize: 100, cursor: "pointer" },
  btn: {
    padding: 15,
    border: "2px solid white",
    background: "transparent",
    color: "white",
    cursor: "pointer",
  },
} satisfies Record<string, CSSProperties>;

// Stufe c: Start und Stopp laufen über State. Ändert sich isRunning, räumt React den
// alten Effekt per Cleanup auf und führt den Effekt mit dem neuen Wert erneut aus.

let GLOBAL_START_TIME = null;
let GLOBAL_END_TIME = null;

const App = () => {
  const [startTimeSecs, setStartTimeSecs] = useState<number | undefined>(
    undefined
  );

  const [isRunning, setRunning] = useState(false);
  const [reactionTime, setReactionTime] = useState(0);

  useEffect(() => {
    let timerId = null;
    if (isRunning) {
      const randomWaitMs = (Math.random() * 2 + 2.5) * 1000;

      timerId = setTimeout(() => {
        GLOBAL_START_TIME = new Date();
        setStartTimeSecs(new Date().getTime());
      }, randomWaitMs);
    }

    return () => {
      // eslint-disable-next-line @typescript-eslint/no-unused-expressions
      timerId && clearTimeout(timerId);
    };
  }, [isRunning]);

  const isWaitingForGreen = isRunning && startTimeSecs == undefined;

  const startGame = () => setRunning(true);

  const handleUserClick = () => {
    GLOBAL_END_TIME = new Date();
    if (isWaitingForGreen) {
      // user pressed too early
      setReactionTime(-1);
      setRunning(false);
    } else {
      const timeNow = new Date().getTime();

      console.log(
        "real_val:",
        GLOBAL_END_TIME.getTime() - GLOBAL_START_TIME.getTime()
      );
      setReactionTime(timeNow - (startTimeSecs || 0));
    }
    // setRunning(false);
  };

  const displayText = !isRunning
    ? "Press anywhere to start"
    : isWaitingForGreen
    ? "Please wait for green :)"
    : reactionTime < 0
    ? "You pressed too early, you loose!"
    : reactionTime == 0
    ? "click me :)"
    : `Your reaction time is ${reactionTime} ms `;

  return (
    <div
      style={{
        ...styles.container,
        backgroundColor: !isWaitingForGreen && isRunning ? "green" : "darkblue",
      }}
      onClick={isRunning ? handleUserClick : startGame}
    >
      <div style={styles.title}>Reaction Game</div>

      <div style={styles.time}>{displayText}</div>
    </div>
  );
};

export default App;
