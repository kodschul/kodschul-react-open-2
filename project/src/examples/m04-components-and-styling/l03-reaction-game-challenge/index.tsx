import { useEffect, useRef, useState } from "react";

// Zustände des Spiels: genau einer gilt zu jedem Zeitpunkt
type Status = "idle" | "waiting" | "ready" | "tooSoon" | "result";

// Vollständige Klassennamen, damit Tailwind sie findet
const areaColor: Record<Status, string> = {
  idle: "bg-gray-500",
  waiting: "bg-red-600",
  ready: "bg-green-500",
  tooSoon: "bg-orange-500",
  result: "bg-blue-600",
};

const App = () => {
  // State: Alles, was die Anzeige verändert
  const [status, setStatus] = useState<Status>("idle");
  const [reactionTime, setReactionTime] = useState<number | null>(null);

  // Refs: Werte, die nur im Hintergrund gebraucht werden
  const timeoutIdRef = useRef<number | undefined>(undefined);
  const greenStartRef = useRef<number | null>(null);

  // Cleanup beim Verlassen der Seite: ein laufender Timeout wird abgebrochen
  useEffect(() => {
    return () => window.clearTimeout(timeoutIdRef.current);
  }, []);

  const startGame = () => {
    window.clearTimeout(timeoutIdRef.current);
    setStatus("waiting");
    setReactionTime(null);

    const randomDelay = 1000 + Math.random() * 2000;
    timeoutIdRef.current = window.setTimeout(() => {
      greenStartRef.current = performance.now();
      setStatus("ready");
    }, randomDelay);
  };

  const handleAreaClick = () => {
    if (status === "waiting") {
      // zu früh: den geplanten Wechsel auf Grün abbrechen
      window.clearTimeout(timeoutIdRef.current);
      setStatus("tooSoon");
    } else if (status === "ready" && greenStartRef.current !== null) {
      setReactionTime(Math.round(performance.now() - greenStartRef.current));
      setStatus("result");
    }
  };

  // abgeleitet aus status und reactionTime, kein eigener State
  const messages: Record<Status, string> = {
    idle: "Klicke auf Start",
    waiting: "Warte auf Grün …",
    ready: "Jetzt klicken!",
    tooSoon: "Zu früh!",
    result: `${reactionTime} ms`,
  };

  return (
    <div className="flex min-h-screen flex-col items-center justify-center gap-6 bg-gray-100 text-black">
      <h1 className="text-3xl font-bold">Reaktionsspiel</h1>
      <div
        onClick={handleAreaClick}
        className={`flex h-72 w-72 cursor-pointer items-center justify-center rounded-xl text-2xl font-semibold text-white transition-colors duration-300 select-none ${areaColor[status]}`}
      >
        {messages[status]}
      </div>
      <button
        onClick={startGame}
        className="rounded bg-blue-600 px-6 py-2 text-lg text-white transition-colors hover:bg-blue-700"
      >
        {status === "idle" ? "Start" : "Neue Runde"}
      </button>
    </div>
  );
};

export default App;
