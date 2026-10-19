import { useCounter } from "./useCounter";

// Erweiterung: Counter aus Lab 2.2 mit ausgelagerter Logik.
const App = () => {
  const { count, increment, decrement, reset } = useCounter(100);

  return (
    <main className="flex flex-col items-center gap-4 p-8">
      <h1 className="text-3xl font-bold">Counter App</h1>
      <div className="text-5xl font-bold">{count}</div>
      <div className="flex gap-2">
        <button className="rounded border px-4 py-2 hover:bg-gray-100" onClick={increment}>
          +
        </button>
        <button className="rounded border px-4 py-2 hover:bg-gray-100" onClick={decrement}>
          –
        </button>
        <button className="rounded border px-4 py-2 hover:bg-gray-100" onClick={reset}>
          Reset
        </button>
      </div>
    </main>
  );
};

export default App;
