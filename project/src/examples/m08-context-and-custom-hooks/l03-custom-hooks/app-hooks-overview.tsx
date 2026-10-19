import { use, useEffect, useEffectEvent, useReducer } from "react";
import { ThemeContext } from "../l02-context-api/theme-context";

// Ausblick: zwei Hooks aus der Überblickstabelle in Lab 8.3 (nur lesen, keine Übung).

type State = { count: number };
type Action = { type: "increment" } | { type: "decrement" } | { type: "reset" };

// useReducer: Alle Zustandsänderungen stehen an einer Stelle.
const reducer = (state: State, action: Action): State => {
  switch (action.type) {
    case "increment":
      return { count: state.count + 1 };
    case "decrement":
      return { count: Math.max(0, state.count - 1) };
    case "reset":
      return { count: 0 };
  }
};

const App = () => {
  const [state, dispatch] = useReducer(reducer, { count: 0 });

  // use(): liest wie useContext, darf aber auch in Bedingungen stehen. Ohne Provider fällt es auf null zurück.
  const theme = use(ThemeContext);

  // useEffectEvent: Der Effekt liest den aktuellen count, ohne bei jeder Änderung neu zu starten.
  const logCount = useEffectEvent(() => {
    console.log(`Tick: count = ${state.count}`);
  });

  useEffect(() => {
    const timerId = setInterval(() => logCount(), 3000);
    return () => clearInterval(timerId);
  }, []);

  return (
    <main className="flex flex-col items-center gap-4 p-8">
      <h1 className="text-3xl font-bold">Hooks im Überblick</h1>
      <p>Theme-Provider vorhanden: {theme === null ? "nein" : "ja"}</p>
      <div className="text-5xl font-bold">{state.count}</div>
      <div className="flex gap-2">
        <button className="rounded border px-4 py-2" onClick={() => dispatch({ type: "increment" })}>
          +
        </button>
        <button className="rounded border px-4 py-2" onClick={() => dispatch({ type: "decrement" })}>
          –
        </button>
        <button className="rounded border px-4 py-2" onClick={() => dispatch({ type: "reset" })}>
          Reset
        </button>
      </div>
      <p className="text-sm">Die Konsole zeigt alle drei Sekunden den aktuellen Wert.</p>
    </main>
  );
};

export default App;
