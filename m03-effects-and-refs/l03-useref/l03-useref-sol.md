# Lab 3.3 – Lösung: useRef – Werte merken ohne Re-Render

## Aufgabe 1: Eingabefeld mit State

```tsx
const [inputValue, setInputValue] = useState("");

// im JSX
<input
  style={styles.input}
  type="text"
  value={inputValue}
  onChange={(e) => setInputValue(e.target.value)}
  placeholder="Tippe etwas ein …"
/>
<div>Eingabe: {inputValue}</div>
<button style={styles.btn} onClick={() => setInputValue("")}>Clear</button>
```

## Aufgabe 2: Ref anlegen und anhängen

```tsx
const inputRef = useRef<HTMLInputElement>(null);

// im JSX
<input ref={inputRef} /* … */ />
```

Der Typ `HTMLInputElement` erlaubt `focus()` ohne Cast. `null` ist der Startwert, bis React das Element eingefügt hat.

## Aufgabe 3: Autofokus

```tsx
useEffect(() => {
  inputRef.current?.focus();
}, []);
```

Der Effekt läuft nach dem ersten Render, wenn `inputRef.current` das DOM-Element enthält. Das `?.` fängt den Fall `null` ab. Import: `import { useEffect, useRef, useState, type CSSProperties } from "react";`.

## Aufgabe 4: Counter mit State

```tsx
const [count, setCount] = useState(0);

// im JSX
<div style={styles.value}>{count}</div>
<button style={styles.btn} onClick={() => changeCount(1)}>+</button>
<button style={styles.btn} onClick={() => changeCount(-1)}>–</button>
```

`changeCount` entsteht in Aufgabe 5. Für diese Aufgabe genügt vorübergehend `onClick={() => setCount(count + 1)}`.

## Aufgabe 5: Klickzähler per Ref

```tsx
const clickCountRef = useRef(0);

const changeCount = (delta: number) => {
  setCount(count + delta);
  clickCountRef.current += 1;
  console.log(`Klicks insgesamt: ${clickCountRef.current}`);
};
```

Der Ref wird im Handler gelesen und geschrieben, das ist erlaubt. Als State würde jeder Klick den Zähler zusätzlich rendern lassen, obwohl er nirgends angezeigt wird.

## Aufgabe 6: „Nur zählen“ und Render-Log

```tsx
console.log("Render"); // im Komponentenkörper

const countOnly = () => {
  clickCountRef.current += 1;
  console.log(`Klicks insgesamt: ${clickCountRef.current}`);
};

// im JSX
<button style={styles.btn} onClick={countOnly}>Nur zählen</button>
```

| Klick auf | Konsole |
| --------- | ------- |
| „+“ oder „–“ | „Klicks insgesamt: n“ und „Render“ (State geändert; in der Entwicklung kann „Render“ doppelt erscheinen) |
| „Nur zählen“ | nur „Klicks insgesamt: n“, kein „Render“ |

Eine Änderung von `ref.current` löst kein Re-Render aus, nur der Setter von `useState` tut das.

## Aufgabe 7: Linter-Meldung

Probehalber im Komponentenkörper:

```tsx
console.log(`Geklickt: ${clickCountRef.current}`);
```

Der Linter meldet `Cannot access refs during render` (`react-hooks/refs`). Begründung: Der Render muss ein reines Ergebnis aus State und Props liefern; ein Ref ändert sich außerhalb davon. Das Log wieder in den Handler stellen.

## Gültige Alternative

Statt `useEffect` mit `inputRef.current?.focus()` setzt das HTML-Attribut `autoFocus` den Fokus ebenfalls. Der Ref-Weg lässt sich zusätzlich später per Button (`inputRef.current?.focus()` im Handler) wiederverwenden.

Referenz-App: `src/examples/m03-effects-and-refs/l03-useref/index.tsx` (Vergleich Variable/State/Ref: `app-variable-state-ref.tsx`)
