import React, { useState, useEffect } from "react";

const styles = {
  container: {
    display: "flex",
    flexDirection: "column" as const,
    alignItems: "center",
    justifyContent: "center",
    height: "100vh",
    fontFamily: "Arial, sans-serif",
  },
  button: {
    padding: "10px 20px",
    fontSize: "18px",
    marginTop: "20px",
    cursor: "pointer",
    border: "none",
    borderRadius: "5px",
    backgroundColor: "#007bff",
    color: "white",
    transition: "background-color 0.3s",
  },
  buttonHover: {
    backgroundColor: "#0056b3",
  },
  gameArea: (bgColor: string) => ({
    width: "300px",
    height: "300px",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    fontSize: "24px",
    color: "white",
    backgroundColor: bgColor,
    borderRadius: "10px",
    transition: "background-color 0.5s",
  }),
};

let greenStartTime = null;

const ReactionGame: React.FC = () => {
  const [status, setStatus] = useState("waiting");
  const [message, setMessage] = useState("Click to start");
  const [reactionTime, setReactionTime] = useState<number | null>(null);
  const [startTime, setStartTime] = useState<number | null>(null);
  const [timeoutId, setTimeoutId] = useState<NodeJS.Timeout | null>(null);

  const startGame = () => {
    setStatus("waiting");
    setMessage("Wait for green...");
    setReactionTime(null);
    if (timeoutId) clearTimeout(timeoutId);

    const randomDelay = Math.random() * 2000 + 1000;
    const timer = setTimeout(() => {
      greenStartTime = new Date();

      console.log("START_TIME", greenStartTime);

      setStatus("ready");
      setMessage("Click now!");

      setStartTime(Date.now());
    }, randomDelay);
    setTimeoutId(timer);
  };

  const handleClick = () => {
    console.log("CLICK_TIME", new Date().toLocaleTimeString());
    console.log(
      "REAL_REACTION",
      new Date().getTime() - greenStartTime.getTime()
    );

    if (status === "waiting") {
      setMessage("Too soon! Try again.");
      setStatus("waiting");
      if (timeoutId) clearTimeout(timeoutId);
    } else if (status === "ready" && startTime) {
      const endTime = Date.now();
      setReactionTime(endTime - startTime);
      setStatus("waiting");
      setMessage(`Your reaction time: ${endTime - startTime} ms`);
    }
  };

  return (
    <div style={styles.container}>
      <div
        style={styles.gameArea(status === "ready" ? "green" : "red")}
        onClick={handleClick}
      >
        {message}
      </div>
      <button style={styles.button} onClick={startGame}>
        Start
      </button>
      {reactionTime !== null && <p>Your reaction time: {reactionTime} ms</p>}
    </div>
  );
};

export default ReactionGame;
