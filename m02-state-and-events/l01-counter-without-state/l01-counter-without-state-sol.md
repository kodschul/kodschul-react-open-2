# Lab 2.1 – Lösung: Counter ohne State untersuchen

## Aufgabe 1: Starter kopieren

`src/playground/App.tsx` enthält danach die Counter-App ohne State (Referenz: `src/examples/m02-state-and-events/l01-counter-without-state/index.tsx`).

## Aufgabe 2: Anzahl `RENDERING`

Beim Neuladen steht `RENDERING` zweimal in der Konsole. Der zweite Aufruf stammt von StrictMode, das Komponentenfunktionen in der Entwicklung doppelt aufruft; mit React Developer Tools ist der zweite Eintrag abgedunkelt. Im Produktionsbuild gäbe es einen Eintrag.

## Aufgabe 3: Klicks vergleichen

| Klick | Konsole | Angezeigte Zahl |
| --- | --- | --- |
| „+“ | `UP 101` | `100` |
| „+“ | `UP 102` | `100` |
| „+“ | `UP 103` | `100` |
| „–“ | `DOWN 102` | `100` |

Es erscheint kein neues `RENDERING`. Die Variable `count` ändert sich, die Anzeige nicht.

## Aufgabe 4: Components-Tab

`App` zeigt keinen State-Eintrag, weil die Komponente keinen State verwendet. Die Zahl 100 entsteht in jedem Aufruf neu aus `let count = 100`.

## Aufgabe 5: Hypothese

```tsx
// Die Anzeige bleibt bei 100, weil nur die lokale Variable count geändert wird und React die Komponente dafür nicht erneut rendert.
```

Kernpunkte jeder guten Hypothese: (1) die Variable ändert sich, (2) die Anzeige wird nur beim Rendern erzeugt, (3) die Änderung löst kein Rendern aus.

## Aufgabe 6: Linter

```bash
npx eslint src/playground/App.tsx
```

Ausgabe (gekürzt):

```text
error  Error: Cannot reassign variable after render completes ... react-hooks/immutability
```

Die Regel `react-hooks/immutability` beschreibt dasselbe Problem: Werte, die nach dem Rendern geändert und angezeigt werden sollen, gehören in State. Die Zeile `/* eslint-disable react-hooks/immutability … */` stellt den Starter wieder her; sie ist nur für dieses absichtlich fehlerhafte Beispiel gesetzt.

Referenz-App: `src/examples/m02-state-and-events/l01-counter-without-state/index.tsx`
