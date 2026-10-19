import { useState } from "react";

// Starter für Lab 9.3 (b): Counter aus Lab 2.2 (Startwert 100, Buttons "+", "–", "Reset").
// Kopiere die Datei unter gleichem Namen nach src/playground/.
const START_VALUE = 100;

const Counter = () => {
  const [count, setCount] = useState(START_VALUE);

  return (
    <div className="flex flex-col items-center gap-4 p-8">
      <h1 className="text-3xl font-bold">Counter App</h1>
      <div data-testid="countValue" className="text-5xl font-bold">
        {count}
      </div>
      <div className="flex gap-2">
        <button className="rounded border px-4 py-2 hover:bg-gray-100" onClick={() => setCount(count + 1)}>
          +
        </button>
        <button
          className="rounded border px-4 py-2 hover:bg-gray-100"
          onClick={() => setCount(Math.max(0, count - 1))}
        >
          –
        </button>
        <button className="rounded border px-4 py-2 hover:bg-gray-100" onClick={() => setCount(START_VALUE)}>
          Reset
        </button>
      </div>
    </div>
  );
};

export default Counter;
