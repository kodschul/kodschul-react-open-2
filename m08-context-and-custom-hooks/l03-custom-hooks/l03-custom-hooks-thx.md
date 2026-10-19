# Lab 8.3: Eigene Hooks: useTodos und useCountdown

**Leitfragen:**

<details>
<summary>Welche Zeilen der Todo-App haben nichts mit der Anzeige zu tun?</summary>

Der `useState` für die Liste sowie `addTodo`, `removeTodo` und `removeAll`. Sie wandern in `useTodos()`; in der Komponente bleiben JSX und das Eingabefeld.

</details>

<details>
<summary>Warum muss der Name mit `use` beginnen?</summary>

React und der Linter erkennen Hooks nur am Präfix und prüfen dann die Regeln der Hooks. Ohne `use` bleiben Verstöße unbemerkt.

</details>

<details>
<summary>Teilen sich zwei Komponenten mit `useTodos()` dieselbe Liste?</summary>

Nein. Jeder Aufruf erzeugt eigenen State; ein Hook teilt Logik, keine Daten. Geteilte Daten brauchen Context (Lab 8.2).

</details>

- Ein eigener Hook ist eine Funktion mit `use`-Präfix, die andere Hooks aufruft und Werte zurückgibt.
- Die Komponente enthält danach nur Darstellung; Logik ist wiederverwendbar und einzeln testbar.

## Warum Hooks und eigene Hooks

- Hooks (seit React 16.8) ersetzen Klassenkomponenten: Zustand und Effekte gibt es in Funktionskomponenten.
- Logik lässt sich ohne Klassenhierarchie wiederverwenden; Komponenten werden kürzer und besser lesbar.
- Ausgelagerte Logik ist einzeln testbar (Lab 9.3).

## Todo-App: erst ohne, dann mit Hook

Ohne Hook liegt alles in der Komponente (Starter: `src/starters/m08-l03-todo-app.tsx`):

```tsx
const App = () => {
  const [todoText, setTodoText] = useState("");
  const [todos, setTodos] = useState(["essen", "trinken", "coden"]);   // Logik
  const addTodo = (text: string) => setTodos([text, ...todos]);        // Logik
  const removeTodo = (todo: string) => setTodos(todos.filter((el) => el !== todo)); // Logik
  const removeAll = () => setTodos([]);                                  // Logik
  // … JSX
};
```

Mit Hook steht die Listenlogik in `useTodos.ts` (Referenz: `src/examples/m08-context-and-custom-hooks/l03-custom-hooks/`):

```ts
// useTodos.ts
export const useTodos = (initialTodos: string[] = ["essen", "trinken", "coden"]) => {
  const [todos, setTodos] = useState<string[]>(initialTodos);

  // Funktionale Updates (prev): immer der aktuelle Stand, auch bei schnellen Klicks.
  const addTodo = (text: string) =>
    setTodos((prev) => (prev.includes(text) ? prev : [text, ...prev]));
  const removeTodo = (todo: string) => setTodos((prev) => prev.filter((el) => el !== todo));
  const removeAll = () => setTodos([]);

  return { todos, addTodo, removeTodo, removeAll };   // Rückgabe als Objekt
};
```

```tsx
// index.tsx: nur noch Darstellung und Eingabefeld
const App = () => {
  const [todoText, setTodoText] = useState("");
  const { todos, addTodo, removeTodo, removeAll } = useTodos();
  // … JSX wie zuvor
};
```

| Rückgabe | Array (`useState`) | Objekt (`useTodos`) |
| --- | --- | --- |
| Zugriff | per Position, Namen frei wählbar | per Name, Reihenfolge egal |
| Geeignet für | zwei Werte | viele Werte und Funktionen |

Jeder Aufruf hat eigenen State (`app-two-lists.tsx`): Zwei `TodoList`-Komponenten mit `useTodos()` zeigen zwei unabhängige Listen.

## Countdown als Hook

`useCountdown({ interval })` kapselt State, Intervall und Cleanup aus Lab 3.4.

```ts
// useCountdown.ts
type UseCountdownOptions = {
  interval?: number;   // typisierter Parameter, Standard 1000 ms
};

export const useCountdown = ({ interval = 1000 }: UseCountdownOptions = {}) => {
  const [secsLeft, setSecsLeft] = useState(-1);
  const [isActive, setIsActive] = useState(false);

  // Abgeleitet statt zweiter Effekt: Bei 0 läuft nichts mehr.
  const isRunning = isActive && secsLeft > 0;

  useEffect(() => {
    if (!isRunning) return;
    const timerId = setInterval(() => setSecsLeft((prev) => prev - 1), interval);
    return () => clearInterval(timerId);   // Cleanup bei Stop, 0 oder Intervallwechsel
  }, [isRunning, interval]);                // interval gehört in die Dependencies

  const start = (duration: number) => {
    setSecsLeft(duration);
    setIsActive(true);
  };
  const stop = () => setIsActive(false);

  return { secsLeft, isRunning, start, stop };
};
```

| Stelle | Älterer Code | Hier |
| --- | --- | --- |
| Dependencies | `[isTimerRunning]` ohne `interval` | `[isRunning, interval]`; Intervallwechsel startet den Timer neu |
| Parameter | untypisiert (`duration`) | `number`, Optionen als Typ |
| Stopp bei 0 | zweiter Effekt mit `setTimerRunning(false)` | abgeleiteter Wert `isRunning` |

```tsx
// app-countdown.tsx: Komponente hält nur das Eingabefeld
const { secsLeft, isRunning, start, stop } = useCountdown({ interval: 1000 });
// <button onClick={() => start(Number(timeSecs))}>Start</button>
```

## Weitere Beispiele für eigene Hooks

```ts
// Fensterbreite verfolgen: Listener im Effekt, Aufräumen im Cleanup
export const useWindowWidth = () => {
  const [width, setWidth] = useState(window.innerWidth);
  useEffect(() => {
    const handleResize = () => setWidth(window.innerWidth);
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);
  return width;
};

// useCounter (Erweiterung): Logik des Counters aus Lab 2.2
export const useCounter = (initialValue = 0) => {
  const [count, setCount] = useState(initialValue);
  const increment = () => setCount((prev) => prev + 1);
  const decrement = () => setCount((prev) => Math.max(0, prev - 1));
  const reset = () => setCount(initialValue);
  return { count, increment, decrement, reset };
};
```

Ein selbst geschriebenes `useFetch` für Daten ersetzt in der Praxis `useQuery` (Lab 6.1); externe Hooks wie `useQuery`, `useParams` und `useForm` werden genauso aufgerufen wie eigene.

## Regeln der Hooks

React identifiziert Hooks über die Reihenfolge der Aufrufe. Bleibt die Reihenfolge von Render zu Render nicht gleich, vertauscht React die gespeicherten Werte.

| Regel | Falsch | Richtig |
| --- | --- | --- |
| Nur auf oberster Ebene aufrufen | Hook in `if`, Schleife, `try/catch` oder verschachtelter Funktion | Hook am Anfang der Komponente, Bedingung innerhalb des Hooks |
| Nicht nach einem frühen `return` | `if (!user) return null; const [x] = useState()` | Hooks vor dem `return` |
| Immer in gleicher Reihenfolge | Anzahl der Aufrufe hängt von Daten ab | feste Aufrufe bei jedem Render |
| Nur in Funktionskomponenten und eigenen Hooks | Hook in Klassenkomponente, normaler Funktion oder Event-Handler | in Komponenten oder `use…`-Funktionen |
| Eigene Hooks beginnen mit `use` | `getTodos()` ruft `useState` auf | `useTodos()` |

- `eslint-plugin-react-hooks` (Regel `rules-of-hooks`) meldet Verstöße im Editor.
- Einzige Ausnahme: `use(…)` darf in Bedingungen und Schleifen stehen.

## Weitere eingebaute Hooks im Überblick

| Hook | Zweck | Wann braucht man das? |
| --- | --- | --- |
| `useReducer` | State mit mehreren Aktionen, Änderungen zentral in einer Funktion (ähnlich Redux) | wenn viele zusammenhängende Änderungen an einem State-Objekt stattfinden |
| `use` | liest Context oder ein Promise; darf in Bedingungen stehen | Context bedingt lesen; Promises mit `<Suspense>` (Ausblick) |
| `useEffectEvent` | Funktion, die im Effekt immer den aktuellen State liest, ohne Dependency zu sein | Effekt soll nicht neu starten, wenn sich ein nur gelesener Wert ändert |
| `useLayoutEffect` | wie `useEffect`, läuft aber synchron nach den DOM-Änderungen und vor dem Zeichnen | Größe oder Position eines Elements messen, bevor es sichtbar wird |
| `useMemo` | merkt sich ein Berechnungsergebnis | siehe Hinweis zum React Compiler |
| `useCallback` | merkt sich eine Funktion | siehe Hinweis zum React Compiler |
| `memo` | überspringt das Rendern bei gleichen Props | siehe Hinweis zum React Compiler |

```tsx
// useReducer: alle Änderungen an einer Stelle (app-hooks-overview.tsx)
type Action = { type: "increment" } | { type: "decrement" } | { type: "reset" };

const reducer = (state: { count: number }, action: Action) => {
  switch (action.type) {
    case "increment": return { count: state.count + 1 };
    case "decrement": return { count: Math.max(0, state.count - 1) };
    case "reset":     return { count: 0 };
  }
};
const [state, dispatch] = useReducer(reducer, { count: 0 });
// dispatch({ type: "increment" })

// useEffectEvent: Intervall startet einmal, loggt aber immer den aktuellen Wert
const logCount = useEffectEvent(() => console.log(state.count));
useEffect(() => {
  const timerId = setInterval(() => logCount(), 3000);
  return () => clearInterval(timerId);
}, []);
```

**`useMemo`, `useCallback`, `memo` und der React Compiler:** Der React Compiler (1.0, im Kurs-Projekt aktiv) memoisiert Komponenten und Hooks beim Build automatisch. Für neue Apps ist manuelles Memoisieren meist unnötig. In älterem Code stehen die Aufrufe weiterhin; sie bleiben nützlich, wenn der Compiler nicht aktiv ist oder ein Wert als stabile Dependency eines Effekts dienen muss.

> **Merksatz:** Ein eigener Hook teilt Logik, nicht State; der Name beginnt mit `use`, und die Regeln der Hooks gelten unverändert.

## Fazit

- Eigene Hooks trennen Logik von Darstellung und sind wiederverwendbar.
- Jeder Hook-Aufruf besitzt eigenen State.
- Die Regeln der Hooks sichern die Aufrufreihenfolge; der Linter prüft sie.
- Weitere Hooks (`useReducer`, `use`, `useEffectEvent`, `useLayoutEffect`) sind Werkzeuge für Sonderfälle.

In der Übung entstehen `useTodos()` und `useCountdown()`; `useCounter` ist die Erweiterung.
