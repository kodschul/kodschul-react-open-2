# Lab 2.2 – Lösung: Counter mit useState

## Aufgabe 1: Starter kopieren

`src/playground/App.tsx` enthält den Counter ohne State aus Lab 2.1. Die Anzeige bleibt bei 100.

## Aufgabe 2: useState einbauen

```tsx
import { useState } from "react";

const App = () => {
  console.warn("RENDERING");
  const [count, setCount] = useState(100);

  const handleCountUp = () => {
    setCount(count + 1);
    console.warn("UP", count);
  };

  const handleCountDown = () => {
    setCount(count - 1);
    console.warn("DOWN", count);
  };

  // return unverändert
};
```

Begründung: Der Setter speichert den neuen Wert und plant ein neues Rendern ein; die Anzeige `{count}` im JSX bleibt unverändert.

## Aufgabe 3: Beobachtung

| Klick | Konsole | Anzeige |
| --- | --- | --- |
| „+“ | `UP 100`, dann `RENDERING` | `101` |
| „+“ | `UP 101`, dann `RENDERING` | `102` |
| „+“ | `UP 102`, dann `RENDERING` | `103` |

`UP` zeigt den Wert des Renders, in dem geklickt wurde (Schnappschuss). `RENDERING` erscheint nach jedem Klick, weil der Setter ein neues Rendern auslöst; in der Entwicklung durch StrictMode doppelt.

## Aufgabe 4: Linter

```bash
npx eslint src/playground/App.tsx
```

Die Ausgabe ist leer. Die Regel `react-hooks/immutability` meldet nichts mehr, weil keine Variable mehr nach dem Rendern zugewiesen wird.

## Aufgabe 5: Reset

```tsx
const handleReset = () => {
  setCount(100);
};

// im JSX
<button onClick={handleReset}>Reset</button>
```

## Aufgabe 6: Untergrenze 0

```tsx
const handleCountDown = () => {
  if (count > 0) {
    setCount(count - 1);
  }
  console.warn("DOWN", count);
};
```

Gültige Alternativen: `setCount(Math.max(0, count - 1))` oder `disabled={count === 0}` am Button „–“, das den Klick ganz verhindert.

## Aufgabe 7: State in den Developer Tools

Im Tab „Components“ zeigt `App` unter „hooks“ `State: 101` (je nach Klicks). Ein neuer Wert, etwa `42`, mit Enter bestätigt, ändert die Zahl auf der Seite sofort: Die Developer Tools rufen denselben Mechanismus auf wie der Setter.

## Aufgabe 8: Zuweisung statt Setter

```tsx
const handleCountUp = () => {
  count = count + 1;
};
```

Die Konsole meldet beim Klick:

```text
Uncaught TypeError: Assignment to constant variable.
```

`count` stammt aus `const [count, setCount] = useState(100)` und ist nur lesbar. Selbst bei `let` bliebe die Anzeige stehen, weil ohne Setter kein neues Rendern ausgelöst wird. Der Editor markiert die Zeile bereits vor dem Klick (`Cannot assign to 'count' because it is a constant`).

## Erweiterung: Schrittweite als zweiter State

```tsx
const [count, setCount] = useState(100);
const [step, setStep] = useState(1);

const handleCountUp = () => {
  setCount(count + step);
};

const handleCountDown = () => {
  setCount(Math.max(0, count - step));
};

// im JSX
<input type="number" min={1} value={step} onChange={(e) => setStep(Number(e.target.value))} />
```

Zwei unabhängige Werte brauchen zwei States. Die Eingabe per `value` und `onChange` folgt in Lab 2.3.

Referenz-App: `src/examples/m02-state-and-events/l02-usestate-counter/index.tsx` (Erweiterung: `app-step.tsx` im selben Ordner)
