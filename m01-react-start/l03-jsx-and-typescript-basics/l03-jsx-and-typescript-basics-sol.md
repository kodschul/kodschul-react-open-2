# Lab 1.3 – Lösung: Statisches Counter-Layout und Typ `Character`

## Aufgabe 1: Starter kopieren

Nach dem Kopieren enthält `src/playground/App.tsx` den Starter. Der Playground zeigt die Überschrift „Counter App“ auf blauem Hintergrund.

## Aufgabe 2: Startwert als Variable

```tsx
const App = () => {
  const startValue = 100;

  return (
    <main style={styles.container}>
      <h1>Counter App</h1>
      <div>{startValue}</div>
    </main>
  );
};
```

Begründung: `{startValue}` bettet einen JavaScript-Ausdruck ein; der Wert kommt aus der Variablen und nicht als fester Text in das JSX.

## Aufgabe 3: Stil als Objekt

```tsx
<div style={{ fontSize: 40, fontWeight: "bold" }}>{startValue}</div>
```

Die äußeren `{}` öffnen JavaScript, die inneren sind das Stil-Objekt. Zahlen gelten als Pixel, Eigenschaften stehen in camelCase.

## Aufgabe 4: Buttons

```tsx
<div style={{ display: "flex", gap: 12 }}>
  <button>+</button>
  <button>–</button>
</div>
```

Die beiden Buttons stehen in einem Wurzelelement `div`; alternativ umschließt ein Fragment `<>…</>` Geschwister ohne zusätzliches Element.

## Aufgabe 5: Typ `Character`

```tsx
type Character = {
  id: number;
  name: string;
  status: "Alive" | "Dead" | "unknown";
  species: string;
  image: string;
};
```

Begründung: Die Union beschränkt `status` auf die Werte, die die API liefert. `src/shared/character.ts` verwendet `string`, um beliebige API-Antworten zu erlauben; beide Varianten sind gültig.

## Aufgabe 6: Objekt anlegen und anzeigen

```tsx
const rick: Character = {
  id: 1,
  name: "Rick Sanchez",
  status: "Alive",
  species: "Human",
  image: "https://rickandmortyapi.com/api/character/avatar/1.jpeg",
};

// im JSX unter den Buttons:
<p>
  Beispiel-Charakter: {rick.name} ({rick.status})
</p>
```

Anzeige: „Beispiel-Charakter: Rick Sanchez (Alive)“.

## Aufgabe 7: Typfehler provozieren

```tsx
const rick: Character = { id: "1", /* … */ };
```

Meldung des Editors (Wortlaut je nach TypeScript-Version, hier aus Version 6):

```text
Type 'string' is not assignable to type 'number'.
```

Mit `id: 1` verschwindet die Markierung. Der Fehler erscheint im Editor, bevor der Browser die Seite lädt.

## Vollständige Lösung

```tsx
import type { CSSProperties } from "react";

type Character = {
  id: number;
  name: string;
  status: "Alive" | "Dead" | "unknown";
  species: string;
  image: string;
};

const rick: Character = {
  id: 1,
  name: "Rick Sanchez",
  status: "Alive",
  species: "Human",
  image: "https://rickandmortyapi.com/api/character/avatar/1.jpeg",
};

const App = () => {
  const startValue = 100;

  return (
    <main style={styles.container}>
      <h1>Counter App</h1>
      <div style={{ fontSize: 40, fontWeight: "bold" }}>{startValue}</div>
      <div style={{ display: "flex", gap: 12 }}>
        <button>+</button>
        <button>–</button>
      </div>
      <p>
        Beispiel-Charakter: {rick.name} ({rick.status})
      </p>
    </main>
  );
};

const styles = {
  container: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    gap: 12,
    padding: 32,
    minHeight: "100vh",
    boxSizing: "border-box",
    backgroundColor: "darkblue",
    color: "white",
  },
} satisfies Record<string, CSSProperties>;

export default App;
```

## Erweiterung: optionales Feld

```tsx
type Character = {
  id: number;
  name: string;
  status: "Alive" | "Dead" | "unknown";
  species: string;
  image: string;
  type?: string; // optional: darf fehlen
};

const morty: Character = { id: 2, name: "Morty Smith", status: "Alive", species: "Human", image: "" };
```

Beide Objekte sind gültig, weil `type?` das Feld optional macht.

Referenz-App: `src/examples/m01-react-start/l03-jsx-and-typescript-basics/index.tsx`
