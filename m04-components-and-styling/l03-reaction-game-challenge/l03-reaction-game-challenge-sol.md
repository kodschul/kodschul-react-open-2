# Lab 4.3 – Lösung: Mini-Challenge – Reaktionsspiel

## Aufgabe 1: Starter lesen

| `Status` | Farbe (`areaColor`) |
| -------- | ------------------- |
| `idle` | grau |
| `waiting` | rot |
| `ready` | grün |
| `tooSoon` | orange |
| `result` | blau |

## Aufgabe 2: State und abgeleiteter Text

```tsx
const [status, setStatus] = useState<Status>("idle");
const [reactionTime, setReactionTime] = useState<number | null>(null);

const messages: Record<Status, string> = {
  idle: "Klicke auf Start",
  waiting: "Warte auf Grün …",
  ready: "Jetzt klicken!",
  tooSoon: "Zu früh!",
  result: `${reactionTime} ms`,
};

// im JSX
<div className={`… ${areaColor[status]}`}>{messages[status]}</div>
```

Im Starter ersetzt `useState` die Zeile `const status: Status = "idle";`. Import: `import { useEffect, useRef, useState } from "react";`. Der Text folgt aus `status` und `reactionTime`; ein eigener State wäre doppelte Wahrheit.

## Aufgabe 3: Start und zufällige Wartezeit

```tsx
const timeoutIdRef = useRef<number | undefined>(undefined);

const startGame = () => {
  setStatus("waiting");
  setReactionTime(null);

  const randomDelay = 1000 + Math.random() * 2000; // 1–3 s
  timeoutIdRef.current = window.setTimeout(() => {
    setStatus("ready");
  }, randomDelay);
};

// im JSX
<button onClick={startGame} className="…">Start</button>
```

`window.setTimeout` liefert eine Zahl, deshalb passt der Ref-Typ `number | undefined` (kein `NodeJS.Timeout`). Die ID liegt im Ref, weil sie nicht angezeigt wird.

## Aufgabe 4: Startzeit im Ref

```tsx
const greenStartRef = useRef<number | null>(null);

timeoutIdRef.current = window.setTimeout(() => {
  greenStartRef.current = performance.now();
  setStatus("ready");
}, randomDelay);
```

Das Schreiben passiert im Timeout-Callback, nicht im Render.

## Aufgabe 5: Klick auf die Fläche

```tsx
const handleAreaClick = () => {
  if (status === "waiting") {
    window.clearTimeout(timeoutIdRef.current);
    setStatus("tooSoon");
  } else if (status === "ready" && greenStartRef.current !== null) {
    setReactionTime(Math.round(performance.now() - greenStartRef.current));
    setStatus("result");
  }
};

// im JSX an der Fläche
<div onClick={handleAreaClick} className={`… ${areaColor[status]}`}>
```

Im Zustand `waiting` verhindert `clearTimeout`, dass die Fläche später doch noch grün wird. In den anderen Zuständen passiert bei einem Klick nichts.

## Aufgabe 6: Neustart in jedem Zustand

```tsx
const startGame = () => {
  window.clearTimeout(timeoutIdRef.current); // alter Timeout darf nicht mehr feuern
  setStatus("waiting");
  setReactionTime(null);
  // … wie in Aufgabe 3
};

// im JSX
{status === "idle" ? "Start" : "Neue Runde"}
```

Ohne `clearTimeout` würde ein schneller Doppelklick auf „Neue Runde“ zwei Timeouts erzeugen; der erste würde die Fläche zu früh grün färben.

## Aufgabe 7: Cleanup beim Verlassen

```tsx
useEffect(() => {
  return () => window.clearTimeout(timeoutIdRef.current);
}, []);
```

Der Cleanup läuft beim Unmount und bricht einen noch ausstehenden Timeout ab. Der Zugriff auf `timeoutIdRef.current` im Cleanup ist erlaubt.

## Aufgabe 8: Testen

| Aktion | Erwartet |
| ------ | -------- |
| „Start“, grün abwarten, klicken | blau, Anzeige z. B. „243 ms“ |
| „Start“, sofort auf die rote Fläche klicken | orange „Zu früh!“, danach bleibt sie orange |
| „Neue Runde“ dreimal schnell klicken | nur ein Grünsignal pro Runde |
| `npm run lint` | keine Fehler |

## Gültige Alternative

Statt `performance.now()` funktioniert `Date.now()` für Reaktionszeiten ebenfalls. `performance.now()` ist unabhängig von Änderungen der Systemuhr und feiner aufgelöst.

Referenz-App: `src/examples/m04-components-and-styling/l03-reaction-game-challenge/index.tsx`
