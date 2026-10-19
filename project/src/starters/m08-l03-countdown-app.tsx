import { useEffect, useState } from "react";

// Starter für Lab 8.3 (b): Countdown mit der Timer-Logik direkt in der Komponente (Ergebnis von Lab 3.4).
// Aufgabe: Timer, Intervall und Cleanup in einen Hook useCountdown({ interval }) auslagern.

const App = () => {
  const [timeSecs, setTimeSecs] = useState("5");
  const [secsLeft, setSecsLeft] = useState(-1);
  const [isActive, setIsActive] = useState(false);
  const isRunning = isActive && secsLeft > 0;

  useEffect(() => {
    if (!isRunning) return;
    const timerId = setInterval(() => setSecsLeft((prev) => prev - 1), 1000);
    return () => clearInterval(timerId);
  }, [isRunning]);

  const start = () => {
    setSecsLeft(Number(timeSecs));
    setIsActive(true);
  };
  const stop = () => setIsActive(false);

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
        <button className="rounded border px-4 py-1 hover:bg-white/20" onClick={start}>
          Start
        </button>
        <button className="rounded border px-4 py-1 hover:bg-white/20 disabled:opacity-40" onClick={stop} disabled={!isRunning}>
          Stop
        </button>
      </div>
    </main>
  );
};

export default App;
