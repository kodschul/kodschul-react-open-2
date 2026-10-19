# Lab 3.1 – Lösung: useEffect – Code beim Start und bei Änderungen

## Aufgabe 1: Starter kopieren

`src/starters/m03-l01-two-counters.tsx` liegt nun als `src/playground/App.tsx` vor. Der Playground zeigt zwei feste Zähler „0“.

## Aufgabe 2: States und Buttons

```tsx
const [count1, setCount1] = useState(0);
const [count2, setCount2] = useState(0);

// im JSX
<div style={styles.value}>Counter 1: {count1}</div>
<button style={styles.btn} onClick={() => setCount1(count1 + 1)}>+ Counter 1</button>
<div style={styles.value}>Counter 2: {count2}</div>
<button style={styles.btn} onClick={() => setCount2(count2 + 1)}>+ Counter 2</button>
```

Dazu `import { useEffect, useState, type CSSProperties } from "react";` (der Starter importiert bisher nur den Typ).

## Aufgabe 3–5: Drei Effekte

```tsx
// Effekt 1: leeres Array – einmal nach dem ersten Render
useEffect(() => {
  console.log("Effekt 1: Willkommen!");
}, []);

// Effekt 2: nur bei Änderung von count1
useEffect(() => {
  console.log("Effekt 2: count1 ist jetzt", count1);
}, [count1]);

// Effekt 3: ohne Array – nach jedem Render
useEffect(() => {
  console.log("Effekt 3: irgendetwas hat sich geändert");
});
```

Die Effekte stehen oberhalb des `return`, auf der obersten Ebene der Komponente.

## Aufgabe 6: Protokoll mit Begründung

| Aktion | Konsole (Entwicklung) | Begründung |
| ------ | --------------------- | ---------- |
| Seite laden | Effekt 1, 2, 3 jeweils **zweimal** | Erster Render löst alle drei Effekte aus. `<StrictMode>` wiederholt sie in der Entwicklung (Mount → Cleanup → Mount). |
| Klick „+ Counter 1“ | Effekt 2 und Effekt 3 | `count1` hat sich geändert und Effekt 2 hat `[count1]`. Effekt 3 läuft nach jedem Render. Effekt 1 hat `[]`. |
| Klick „+ Counter 2“ | nur Effekt 3 | `count1` blieb gleich, Effekt 2 bleibt still. Effekt 3 läuft nach jedem Render. |

Im Produktions-Build (`npm run build`, `npm run preview`) erscheint beim Laden jeder Effekt nur einmal.

## Aufgabe 7: Titel per Effekt

```tsx
useEffect(() => {
  document.title = `Counter: ${count1}`;
}, [count1]);
```

Nach drei Klicks lautet der Tab-Titel „Counter: 3“. Das Array enthält `count1`, damit der Titel nur bei Änderungen neu gesetzt wird.

## Aufgabe 8: Titel per `<title>`

Effekt aus Aufgabe 7 löschen, im JSX ergänzen:

```tsx
return (
  <div style={styles.container}>
    <title>{`Counter: ${count1}`}</title>
    {/* … */}
  </div>
);
```

React 19 setzt das Element automatisch in den `<head>`. Das Template-Literal in `{}` verhindert, dass `<title>` mehrere Textknoten bekommt.

## Aufgabe 9: Gerade/ungerade ohne Effekt

```tsx
const parity = count1 % 2 === 0 ? "gerade" : "ungerade";

// im JSX
<div style={styles.value}>Counter 1: {count1} ({parity})</div>
```

Der Wert wird bei jedem Render neu berechnet. Ein zweiter State samt Effekt wäre länger, fehleranfälliger und würde ein zusätzliches Render auslösen.

## Gültige Alternative

Titel mit Effekt bleibt in vielen Projekten üblich und funktioniert. `<title>` ist die kürzere Variante, solange der Titel nur vom State abhängt.

Referenz-App: `src/examples/m03-effects-and-refs/l01-useeffect-basics/index.tsx` (Titel-Variante mit Effekt: `app-title-with-effect.tsx`)
