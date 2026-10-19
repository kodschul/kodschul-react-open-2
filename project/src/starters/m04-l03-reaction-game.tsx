type Status = "idle" | "waiting" | "ready" | "tooSoon" | "result";

const areaColor: Record<Status, string> = {
  idle: "bg-gray-500",
  waiting: "bg-red-600",
  ready: "bg-green-500",
  tooSoon: "bg-orange-500",
  result: "bg-blue-600",
};

// Layout und Farben stehen bereit, die Logik fehlt.
// TODO 1: status als State anlegen (Startwert "idle").
// TODO 2: Start-Button: zufällige Wartezeit (1–3 s), danach status "ready".
// TODO 3: Klick auf die Fläche: bei "waiting" → "Zu früh!", bei "ready" → Reaktionszeit messen.
// TODO 4: Timeout-ID und Startzeit in Refs speichern, laufenden Timeout abbrechen.
const App = () => {
  const status: Status = "idle";

  return (
    <div className="flex min-h-screen flex-col items-center justify-center gap-6 bg-gray-100 text-black">
      <h1 className="text-3xl font-bold">Reaktionsspiel</h1>
      <div
        className={`flex h-72 w-72 cursor-pointer items-center justify-center rounded-xl text-2xl font-semibold text-white transition-colors duration-300 select-none ${areaColor[status]}`}
      >
        Klicke auf Start
      </div>
      <button className="rounded bg-blue-600 px-6 py-2 text-lg text-white transition-colors hover:bg-blue-700">
        Start
      </button>
    </div>
  );
};

export default App;
