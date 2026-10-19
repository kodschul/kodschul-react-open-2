import { useState } from "react";
import { useCountdown } from "./useCountdown";

// Die Komponente hält nur das Eingabefeld; Timer, Intervall und Cleanup stecken in useCountdown.
const App = () => {
  const [timeSecs, setTimeSecs] = useState("5");
  const { secsLeft, isRunning, start, stop } = useCountdown({ interval: 1000 });

  return (
    <main
      className={`flex min-h-screen flex-col items-center gap-6 p-8 text-white ${
        secsLeft === 0 ? "bg-red-600" : "bg-blue-900"
      }`}
    >
      <h1 className="text-3xl font-bold">Countdown</h1>
      {secsLeft >= 0 && <div className="text-8xl">{secsLeft}</div>}
      <div className="flex gap-2">
        <input
          className="w-24 rounded px-2 py-1 text-2xl text-black"
          type="number"
          min={1}
          value={timeSecs}
          onChange={(e) => setTimeSecs(e.target.value)}
        />
        <button
          className="rounded border px-4 py-1 hover:bg-white/20"
          onClick={() => start(Number(timeSecs))}
        >
          Start
        </button>
        <button
          className="rounded border px-4 py-1 hover:bg-white/20 disabled:opacity-40"
          onClick={stop}
          disabled={!isRunning}
        >
          Stop
        </button>
      </div>
    </main>
  );
};

export default App;
