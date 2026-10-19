# Lab 3.4 – Lösung: Countdown-Timer bauen

## Aufgabe 1: States

```tsx
const [inputSecs, setInputSecs] = useState(10);
const [secsLeft, setSecsLeft] = useState(10);
const [isRunning, setRunning] = useState(false);
```

Import: `import { useEffect, useState, type CSSProperties } from "react";`

## Aufgabe 2: Eingabe und Anzeige

```tsx
<div style={styles.secs}>{secsLeft}</div>
<input
  style={styles.input}
  type="number"
  min={0}
  value={inputSecs}
  onChange={(e) => setInputSecs(Math.max(0, e.target.valueAsNumber || 0))}
/>
```

`valueAsNumber` liefert eine Zahl; `|| 0` fängt ein leeres Feld (`NaN`) ab, `Math.max(0, …)` verhindert negative Werte.

## Aufgabe 3: Start und Stop

```tsx
const start = () => {
  setSecsLeft(inputSecs);
  setRunning(true);
};

// im JSX
<button style={styles.btn} onClick={start}>Start</button>
<button style={styles.btn} onClick={() => setRunning(false)}>Stop</button>
```

Start setzt den Zähler neu, deshalb beginnt jeder Lauf beim Eingabewert.

## Aufgabe 4: Abgeleiteter Wert

```tsx
const isTicking = isRunning && secsLeft > 0;
```

`isTicking` ist `false`, sobald nicht mehr gestartet ist oder die Zeit abgelaufen ist.

## Aufgabe 5: Effekt mit funktionalem Update

```tsx
useEffect(() => {
  if (!isTicking) return;

  const timerId = window.setInterval(() => {
    console.log("Tick");
    setSecsLeft((prev) => prev - 1);
  }, 1000);

  return () => window.clearInterval(timerId);
}, [isTicking]);
```

Bei 0 wird `isTicking` `false`: React führt den Cleanup aus und löscht das Intervall. Ein zweiter Effekt „Stopp bei 0“ ist nicht nötig.

## Aufgabe 6: Rote Warnfarbe

```tsx
const isExpired = secsLeft === 0;

// im JSX
<div style={{ ...styles.container, backgroundColor: isExpired ? "red" : "darkblue" }}>
```

Der Starter setzt `backgroundColor: "darkblue"` im `styles.container`; der Spread mit der späteren Eigenschaft überschreibt den Wert bei 0.

## Aufgabe 7: Testen

| Aktion | Erwartetes Ergebnis |
| ------ | ------------------- |
| Eingabe 3, „Start“ | Anzeige 3 → 2 → 1 → 0, drei „Tick“ in der Konsole |
| Bei 0 | Hintergrund rot, kein weiteres „Tick“, kein Wert unter 0 |
| „Stop“ bei 2 | Anzeige bleibt 2, Konsole still |

## Aufgabe 8: Stale Closure sichtbar machen

Mit `setSecsLeft(secsLeft - 1)` im Intervall: Die Anzeige springt einmal (z. B. 10 → 9) und bleibt dann bei 9 stehen. Das Intervall merkt sich `secsLeft` aus dem Render, in dem es erstellt wurde, und setzt jede Sekunde denselben Wert. Der Linter meldet zusätzlich ein fehlendes `secsLeft` im Dependency-Array. Das funktionale Update `(prev) => prev - 1` wiederherstellen.

## Erweiterung: Fortsetzen

```tsx
<button style={styles.btn} onClick={() => setRunning(true)} disabled={isRunning}>
  Fortsetzen
</button>
```

Der Button setzt nur `isRunning` auf `true`, `secsLeft` bleibt unverändert. Nach Ablauf (0) bleibt `isTicking` `false`, der Countdown startet nicht neu.

## Gültige Alternative

Das Hinzufügen von `secsLeft` zum Dependency-Array (mit `setSecsLeft(secsLeft - 1)`) funktioniert ebenfalls, startet das Intervall aber jede Sekunde neu. Das funktionale Update ist die empfohlene Variante.

Referenz-App: `src/examples/m03-effects-and-refs/l04-countdown-timer/index.tsx`
