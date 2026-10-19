# Lab 9.3: Tests mit Vitest und Testing Library

**Leitfragen:**

<details>
<summary>Woher weiß man nach einer Änderung, dass der Counter noch funktioniert?</summary>

Aus automatisierten Tests: `npm test` führt sie bei jeder Änderung aus und meldet Abweichungen sofort, ohne dass die App von Hand durchgeklickt wird.

</details>

<details>
<summary>Was testet ein Unit-Test, was ein Komponententest?</summary>

Ein Unit-Test prüft eine einzelne Funktion oder Klasse ohne Oberfläche (`Calculator`). Ein Komponententest rendert die Komponente, simuliert Klicks und prüft das sichtbare Ergebnis.

</details>

<details>
<summary>Warum braucht der Counter ein `data-testid`?</summary>

Der Zählerstand ist ein `div` ohne Rolle und Beschriftung. `data-testid="countValue"` liefert einen stabilen Zugriff, der von Text und Styling unabhängig ist.

</details>

- Tests prüfen Verhalten automatisch und fangen Fehler nach Änderungen früh ab.
- Vitest führt die Tests aus, Testing Library rendert Komponenten und simuliert Eingaben.

## Vitest im Projekt

Vitest ist ein Test-Runner mit einer zu Jest kompatiblen API. Er nutzt die Konfiguration von Vite (Plugins, Compiler), daher braucht das Projekt keine zweite Build-Konfiguration.

```ts
// vite.config.ts (Auszug)
test: {
  environment: "jsdom",                  // simuliert den Browser (DOM) in Node.js
  setupFiles: ["./src/test-setup.ts"],   // jest-dom-Matcher und cleanup nach jedem Test
},
```

| Aufgabe | Jest (Altprojekte, Folien 2024) | Vitest |
| --- | --- | --- |
| `describe`, `it`, `expect` | globale Funktionen | `import { describe, it, expect } from "vitest"` |
| Attrappe für Funktionen | `jest.fn()` | `vi.fn()` |
| Modul ersetzen | `jest.mock("axios")` | `vi.mock("axios")` |
| Konfiguration | `jest.config.js`, Babel | `test` in `vite.config.ts` |
| Dateinamen | `*.test.ts(x)`, `*.spec.ts(x)` | `*.test.ts(x)`, `*.spec.ts(x)` |

| Befehl | Wirkung |
| --- | --- |
| `npm test` | startet Vitest im Watch-Modus, wiederholt Tests bei Änderungen |
| `npx vitest run` | alle Tests einmal ausführen |
| `npx vitest run src/playground` | nur Tests in einem Ordner |
| `npx vitest run -t "resets"` | nur Tests, deren Name den Text enthält |

## Unit-Test: die Klasse Calculator

Referenz: `src/examples/m09-forms-and-testing/l03-vitest-testing-library/calculator.ts` und `calculator.test.ts`

```ts
// calculator.ts
class Calculator {
  private value = 0;
  add(x: number): number { this.value += x; return this.value; }
  sub(x: number): number { this.value -= x; return this.value; }
  ans(): number { return this.value; }
  reset(): number { this.value = 0; return this.value; }
}
export default Calculator;
```

```ts
// calculator.test.ts
import { beforeEach, describe, expect, it } from "vitest";
import Calculator from "./calculator";

describe("Calculator", () => {          // gruppiert zusammengehörige Tests
  let calculator: Calculator;

  beforeEach(() => {                    // vor jedem Test: frischer Rechner
    calculator = new Calculator();
  });

  it("adds", () => {                    // ein Test = ein erwartetes Verhalten
    calculator.add(2);                  // Aktion
    expect(calculator.ans()).toBe(2);   // Erwartung
  });

  it("adds and subtracts", () => {
    calculator.add(2);
    calculator.sub(1);
    expect(calculator.ans()).toBe(1);
  });
});
```

Erwartete Ausgabe von `npx vitest run`:

```text
 ✓ src/examples/m09-forms-and-testing/l03-vitest-testing-library/calculator.test.ts (4 tests)
 Test Files  1 passed
      Tests  4 passed
```

| Matcher | Prüft |
| --- | --- |
| `toBe(2)` | Gleichheit wie `===` (Zahlen, Strings) |
| `toEqual({ a: 1 })` | gleiche Struktur bei Objekten und Arrays |
| `toBeTruthy()`, `toBeNull()` | Wahrheitswert, `null` |
| `.not.toBe(…)` | Gegenteil |
| `toBeInTheDocument()` | Element steht im DOM (jest-dom) |
| `toHaveTextContent("101")` | Element enthält den Text (jest-dom) |
| `toBeDisabled()`, `toHaveAttribute("href", "…")` | Zustand und Attribute (jest-dom) |

## Komponententest: der Counter

Der Counter aus Lab 2.2 liegt als Kopie im Lab-Ordner: Startwert 100, Buttons „+“, „–“, „Reset“.

```tsx
// Counter.tsx (Auszug)
<div data-testid="countValue">{count}</div>
<button onClick={() => setCount(count + 1)}>+</button>
```

```tsx
// counter.test.tsx
import { describe, expect, it } from "vitest";
import { fireEvent, render, screen } from "@testing-library/react";
import Counter from "./Counter";

describe("Counter", () => {
  it("starts at 100", () => {
    render(<Counter />);                                           // Komponente in jsdom rendern
    expect(screen.getByTestId("countValue")).toHaveTextContent("100");
  });

  it("increments on click on +", () => {
    render(<Counter />);
    fireEvent.click(screen.getByRole("button", { name: "+" }));   // Klick simulieren
    expect(screen.getByTestId("countValue")).toHaveTextContent("101");
  });
});
```

| Abfrage | Findet | Einsatz |
| --- | --- | --- |
| `getByRole("button", { name: "+" })` | Element nach Rolle und Beschriftung | erste Wahl für Buttons, Überschriften, Links |
| `getByLabelText("E-Mail")` | Eingabefeld über sein Label | Formulare |
| `getByText("Alle löschen")` | Element nach sichtbarem Text | Texte ohne Rolle |
| `getByTestId("countValue")` | Element mit `data-testid` | wenn Rolle und Text nicht reichen |

| Präfix | Verhalten bei Treffer / ohne Treffer |
| --- | --- |
| `getBy…` | liefert das Element / wirft einen Fehler |
| `queryBy…` | liefert das Element / liefert `null` (zum Prüfen von „nicht vorhanden“) |
| `findBy…` | wartet asynchron (`await`) auf das Element, z. B. nach einem Request |

- Testing Library fragt wie ein Mensch: nach Rolle, Beschriftung und Text vor `data-testid`.
- `src/test-setup.ts` räumt nach jedem Test auf und registriert die jest-dom-Matcher; dort ist nichts zu ergänzen.
- Ausblick: Requests lassen sich mit `vi.mock("axios")` oder `vi.fn()` ersetzen, sodass Tests ohne Netzwerk laufen.

> **Merksatz:** Ein Test beschreibt erwartetes Verhalten aus Sicht der Nutzenden und schlägt fehl, sobald das Verhalten abweicht.

## Fazit

- Unit-Tests prüfen Logik (`Calculator`), Komponententests prüfen sichtbares Verhalten (`Counter`).
- `describe`, `it` und `expect` strukturieren Tests; `render`, `screen` und `fireEvent` bedienen Komponenten.
- `npm test` überwacht Änderungen, `npx vitest run` läuft einmal durch.

In der Übung werden die Calculator-Tests um `reset` ergänzt und der Counter getestet.
