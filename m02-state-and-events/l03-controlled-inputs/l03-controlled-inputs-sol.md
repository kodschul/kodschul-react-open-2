# Lab 2.3 – Lösung: Input App mit Controlled Input

## Aufgabe 1: Starter kopieren

`src/playground/App.tsx` zeigt den Titel „Input App“ und sonst noch nichts.

## Aufgabe 2: State anlegen

```tsx
import { useState, type CSSProperties } from "react";

const App = () => {
  const [inputValue, setInputValue] = useState("");
  // …
};
```

Der Startwert `""` macht den State zum `string`.

## Aufgabe 3: value ohne onChange

```tsx
<input type="text" value={inputValue} placeholder="Hier etwas eingeben …" />
```

Tippen hat keine Wirkung: Das Feld zeigt immer den State, und der bleibt leer. Die Konsole meldet:

```text
You provided a `value` prop to a form field without an `onChange` handler. This will render a read-only field. If the field should be mutable use `defaultValue`. Otherwise, set either `onChange` or `readOnly`.
```

Referenz für das Fehlerbild: `src/examples/m02-state-and-events/l03-controlled-inputs/app-value-without-onchange.tsx`

## Aufgabe 4: onChange ergänzen

```tsx
<input
  type="text"
  value={inputValue}
  onChange={(e) => setInputValue(e.target.value)}
  placeholder="Hier etwas eingeben …"
/>
```

Begründung: `e.target.value` ist der Text im Feld nach der Änderung; der Setter schreibt ihn in den State, und React rendert das Feld mit diesem Wert neu.

## Aufgabe 5: Anzeige unter dem Feld

```tsx
<p>Eingegebener Text: {inputValue}</p>
```

## Aufgabe 6: Clear-Button

```tsx
<button onClick={() => setInputValue("")}>Clear</button>
```

Gültige Alternative: Handler `const handleClear = () => setInputValue("");` und `onClick={handleClear}`, passend zur Namenskonvention aus Lab 2.1.

## Aufgabe 7: State beobachten

Im Tab „Components“ zeigt `App` unter „hooks“ `State: "…"` mit dem aktuellen Text. Nach „Clear“ steht dort ein leerer Text.

## Vollständige Lösung

```tsx
import { useState } from "react";

const App = () => {
  const [inputValue, setInputValue] = useState("");

  return (
    <main>
      <h1>Input App</h1>
      <input
        type="text"
        value={inputValue}
        onChange={(e) => setInputValue(e.target.value)}
        placeholder="Hier etwas eingeben …"
      />
      <p>Eingegebener Text: {inputValue}</p>
      <button onClick={() => setInputValue("")}>Clear</button>
    </main>
  );
};

export default App;
```

Referenz-App (mit Layout): `src/examples/m02-state-and-events/l03-controlled-inputs/index.tsx`
