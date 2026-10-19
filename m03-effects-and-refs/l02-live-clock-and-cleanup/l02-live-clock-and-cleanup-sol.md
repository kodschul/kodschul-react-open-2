# Lab 3.2 – Lösung: Live-Uhr – Intervalle und Cleanup

## Aufgabe 1: Starter kopieren

`src/starters/m03-l02-clock.tsx` liegt als `src/playground/App.tsx` vor. Der Playground zeigt eine feste Uhrzeit „00:00:00“.

## Aufgabe 2: Stufe a – Uhr läuft

```tsx
const [now, setNow] = useState(() => new Date());

useEffect(() => {
  const timerId = window.setInterval(() => {
    console.log("Tick");
    setNow(new Date());
  }, 1000);

  return () => window.clearInterval(timerId);
}, []);

// im JSX
<div style={styles.time}>{now.toLocaleTimeString("de-DE")}</div>
```

`useState(() => new Date())` berechnet den Startwert nur beim ersten Render. Das leere Array startet das Intervall einmal; der Cleanup löscht es beim Verlassen der Komponente. Import ergänzen: `import { useEffect, useState, type CSSProperties } from "react";`.

## Aufgabe 3: Konsole prüfen

Erwartet: Eine Zeile „Tick“ pro Sekunde, auch in der Entwicklung mit StrictMode. Der Cleanup löscht das erste Intervall, bevor StrictMode den Effekt zum zweiten Mal startet.

## Aufgabe 4: Fehlerfall ohne Cleanup

Ohne die Zeile `return () => window.clearInterval(timerId);`:

- „Tick“ erscheint **zweimal pro Sekunde** – zwei Intervalle laufen parallel (StrictMode-Doppelaufruf).
- Nach jedem Speichern (Hot Reload) kommt ein weiteres Intervall dazu, die Ausgabe wird schneller.

Ein Satz für die Abschlusskriterien: „Ohne Cleanup bleibt jedes gestartete Intervall bestehen und tickt weiter, auch wenn die Komponente neu startet oder verschwindet.“ Cleanup danach wieder einfügen. `src/examples/m03-effects-and-refs/l02-live-clock-and-cleanup/app-no-cleanup.tsx` zeigt den Fehlerfall fertig im Launcher.

## Aufgabe 5: Stufe b – Klick stoppt

```tsx
const timerIdRef = useRef<number | undefined>(undefined);

useEffect(() => {
  timerIdRef.current = window.setInterval(() => {
    console.log("Tick");
    setNow(new Date());
  }, 1000);

  return () => window.clearInterval(timerIdRef.current);
}, []);

const stopTimer = () => {
  window.clearInterval(timerIdRef.current);
};

// im JSX
<div style={styles.time} onClick={stopTimer}>{now.toLocaleTimeString("de-DE")}</div>
```

Der Ref speichert die Timer-ID, ohne ein Re-Render auszulösen. `ref.current` wird nur im Effekt und im Handler gelesen, nie im Render. Grenze: Der Effekt läuft nur einmal, ein Neustart geht so nicht.

## Aufgabe 6: Stufe c – Start/Stopp über State

```tsx
const [isRunning, setRunning] = useState(true);

useEffect(() => {
  if (!isRunning) return;

  const timerId = window.setInterval(() => {
    console.log("Tick");
    setNow(new Date());
  }, 1000);

  return () => window.clearInterval(timerId);
}, [isRunning]);

// im JSX
<div style={styles.time} onClick={() => setRunning(false)}>
  {now.toLocaleTimeString("de-DE")}
</div>
```

Der Ref und `useRef` entfallen. `isRunning` im Array sorgt dafür, dass React bei jeder Änderung erst den Cleanup und dann den Effekt mit dem neuen Wert ausführt.

## Aufgabe 7: Restart-Button

```tsx
<button style={styles.btn} onClick={() => setRunning(true)} disabled={isRunning}>
  Restart
</button>
```

`disabled={isRunning}` verhindert unnötige Klicks, solange die Uhr läuft.

## Aufgabe 8: Testen

Nach mehrfachem Stoppen und Neustarten erscheint weiterhin genau ein „Tick“ pro Sekunde. Während die Uhr steht, bleibt die Konsole still: Der Effekt kehrt vor dem `setInterval` zurück, ein Cleanup ist dafür nicht nötig.

## Gültige Alternative

Statt des frühen `return` lässt sich der Block `if (isRunning) { const timerId = …; return () => window.clearInterval(timerId); }` schreiben. Das Verhalten ist gleich, die Early-Return-Variante braucht weniger Einrückung.

Referenz-App: `src/examples/m03-effects-and-refs/l02-live-clock-and-cleanup/index.tsx` (Stufen: `app-a-running.tsx`, `app-b-stop.tsx`)
