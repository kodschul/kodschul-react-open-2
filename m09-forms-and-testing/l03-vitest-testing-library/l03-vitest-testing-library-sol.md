# Lab 9.3 – Lösung: Tests mit Vitest und Testing Library

## Aufgabe 1: Test für `reset`

```ts
it("resets to 0", () => {
  calculator.add(5);
  expect(calculator.reset()).toBe(0);
  expect(calculator.ans()).toBe(0);
});
```

Zwei Erwartungen: Der Rückgabewert von `reset()` und der gespeicherte Wert müssen übereinstimmen.

## Aufgabe 2: Test für `sub`

```ts
it("subtracts", () => {
  calculator.sub(3);
  expect(calculator.ans()).toBe(-3);
});
```

`beforeEach` liefert in jedem Test einen frischen Rechner mit Wert 0.

## Aufgabe 3: Ausführung

```text
 ✓ src/playground/m09-l03-calculator.test.ts (4 tests)
 Test Files  1 passed
      Tests  4 passed
```

## Aufgabe 4: Klick auf „+“

```tsx
import { describe, expect, it } from "vitest";
import { fireEvent, render, screen } from "@testing-library/react";
import Counter from "./m09-l03-counter";

it("increments on click on +", () => {
  render(<Counter />);
  fireEvent.click(screen.getByRole("button", { name: "+" }));
  expect(screen.getByTestId("countValue")).toHaveTextContent("101");
});
```

`fireEvent` und `screen` kommen zusätzlich in die Import-Zeile von `@testing-library/react`.

## Aufgabe 5: Klick auf „–“

```tsx
it("decrements on click on –", () => {
  render(<Counter />);
  fireEvent.click(screen.getByRole("button", { name: "–" }));
  expect(screen.getByTestId("countValue")).toHaveTextContent("99");
});
```

Der Button-Text ist ein Gedankenstrich („–“), kein Minus-Bindestrich; `name` muss exakt passen.

## Aufgabe 6: Reset

```tsx
it("resets to 100", () => {
  render(<Counter />);
  fireEvent.click(screen.getByRole("button", { name: "+" }));
  fireEvent.click(screen.getByRole("button", { name: "+" }));
  fireEvent.click(screen.getByRole("button", { name: "Reset" }));
  expect(screen.getByTestId("countValue")).toHaveTextContent("100");
});
```

```text
 ✓ src/playground/m09-l03-counter.test.tsx (4 tests)
 Test Files  2 passed
      Tests  8 passed
```

## Aufgabe 7: Absichtlicher Fehler

Bei `setCount(count + 2)` meldet der „+“-Test:

```text
Error: expect(element).toHaveTextContent()

Expected element to have text content:
  101
Received:
  102
```

Der Test fängt die Regression, ohne dass die App geöffnet wird.

## Aufgabe 8: Watch-Modus

`npx vitest` startet den Watch-Modus. Nach dem Speichern des geänderten Startwerts schlägt „starts at 100“ sofort fehl; nach der Korrektur wird der Test wieder grün. `q` beendet den Modus.

## Alternativen

| Variante | Anmerkung |
| --- | --- |
| `screen.getByText("101")` statt `getByTestId` | funktioniert, solange die Zahl nur einmal vorkommt |
| `expect(el.textContent).toBe("101")` statt `toHaveTextContent` | gleichwertig ohne jest-dom-Matcher |
| Fehlende Imports | `import { describe, it, expect } from "vitest"`: Globale Test-APIs sind im Projekt nicht aktiviert |

Referenz: `src/examples/m09-forms-and-testing/l03-vitest-testing-library/` (`calculator.test.ts`, `counter.test.tsx`; App: `index.tsx`)
