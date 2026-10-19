# Lab 8.3 – Lösung: Eigene Hooks: useTodos und useCountdown

## Aufgabe 1: Datei und Funktion

```ts
// src/playground/useTodos.ts
import { useState } from "react";

export const useTodos = () => {
  // …
};
```

Das Präfix `use` ist Pflicht: Nur so prüft der Linter die Regeln der Hooks.

## Aufgabe 2: State mit optionaler Startliste

```ts
export const useTodos = (initialTodos: string[] = ["essen", "trinken", "coden"]) => {
  const [todos, setTodos] = useState<string[]>(initialTodos);
  // …
};
```

## Aufgabe 3: Funktionen mit `prev`

```ts
// Doppelte Einträge werden ignoriert, damit der Text als key taugt.
const addTodo = (text: string) =>
  setTodos((prev) => (prev.includes(text) ? prev : [text, ...prev]));
const removeTodo = (todo: string) => setTodos((prev) => prev.filter((el) => el !== todo));
const removeAll = () => setTodos([]);
```

Funktionale Updates verlassen sich nicht auf einen Wert aus dem Render; der Hook bleibt auch bei schnellen Klicks korrekt.

## Aufgabe 4: Rückgabe als Objekt

```ts
return { todos, addTodo, removeTodo, removeAll };
```

## Aufgabe 5: Hook in `App`

```tsx
const App = () => {
  const [todoText, setTodoText] = useState("");
  const { todos, addTodo, removeTodo, removeAll } = useTodos();

  const handleKeyDown = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter" && todoText.trim() !== "") {
      addTodo(todoText.trim());
      setTodoText("");
    }
  };

  return (/* JSX unverändert */);
};
```

Das Eingabefeld bleibt als `useState` in der Komponente: Es gehört zur Darstellung, nicht zur Listenlogik.

## Aufgabe 6: Zwei Listen

```tsx
// Jeder Aufruf von useTodos() besitzt eigenen State.
const TodoList = ({ title, initialTodos }: { title: string; initialTodos: string[] }) => {
  const { todos, addTodo, removeTodo } = useTodos(initialTodos);
  // … Liste mit Button „Eintrag hinzufügen“
};
```

Erwartet: Ein Eintrag in Liste A erscheint nicht in Liste B. Für geteilte Daten wäre ein Context nötig (Lab 8.2).

Referenz: `src/examples/m08-context-and-custom-hooks/l03-custom-hooks/app-two-lists.tsx`

## Erweiterung A: `useCountdown`

```ts
// src/playground/useCountdown.ts
import { useEffect, useState } from "react";

type UseCountdownOptions = {
  interval?: number;
};

export const useCountdown = ({ interval = 1000 }: UseCountdownOptions = {}) => {
  const [secsLeft, setSecsLeft] = useState(-1);
  const [isActive, setIsActive] = useState(false);

  // Abgeleiteter Wert statt zweitem Effekt: Bei 0 läuft nichts mehr.
  const isRunning = isActive && secsLeft > 0;

  useEffect(() => {
    if (!isRunning) return;
    const timerId = setInterval(() => setSecsLeft((prev) => prev - 1), interval);
    return () => clearInterval(timerId);
  }, [isRunning, interval]);

  const start = (duration: number) => {
    setSecsLeft(duration);
    setIsActive(true);
  };
  const stop = () => setIsActive(false);

  return { secsLeft, isRunning, start, stop };
};
```

`interval` steht im Dependency-Array, weil der Effekt es liest; `setSecsLeft` ist stabil und braucht keinen Eintrag.

```tsx
// App.tsx (Auszug)
const [timeSecs, setTimeSecs] = useState("5");
const { secsLeft, isRunning, start, stop } = useCountdown({ interval: 1000 });

<button onClick={() => start(Number(timeSecs))}>Start</button>
<button onClick={stop} disabled={!isRunning}>Stop</button>
```

Mit `interval: 200` zählt die Anzeige fünfmal schneller; der Timer startet bei Änderung neu.

## Erweiterung B: `useCounter`

```ts
// src/playground/useCounter.ts
import { useState } from "react";

export const useCounter = (initialValue = 0) => {
  const [count, setCount] = useState(initialValue);

  const increment = () => setCount((prev) => prev + 1);
  const decrement = () => setCount((prev) => Math.max(0, prev - 1));
  const reset = () => setCount(initialValue);

  return { count, increment, decrement, reset };
};
```

```tsx
const { count, increment, decrement, reset } = useCounter(100);
```

Referenz-App: `src/examples/m08-context-and-custom-hooks/l03-custom-hooks/index.tsx` (Erweiterungen: `app-countdown.tsx`, `app-counter.tsx`; Überblick weiterer Hooks: `app-hooks-overview.tsx`)
