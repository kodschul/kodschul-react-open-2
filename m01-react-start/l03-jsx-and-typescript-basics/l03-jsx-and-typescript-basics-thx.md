# Lab 1.3: JSX und TypeScript-Typen

**Leitfragen:**

<details>
<summary>Worin unterscheidet sich JSX von HTML?</summary>

JSX ist JavaScript mit HTML-ähnlicher Syntax: `className` statt `class`, `onClick` in camelCase, `style` als Objekt, jedes Element muss geschlossen sein, und `{}` bettet JavaScript-Ausdrücke ein.

</details>

<details>
<summary>Was meldet TypeScript, bevor der Browser überhaupt startet?</summary>

Typfehler wie ein Text, wo eine Zahl erwartet wird, fehlende Pflichtfelder, falsche Feldnamen oder falsche Argumente beim Funktionsaufruf. Der Editor markiert sie beim Tippen, `tsc` und `npm run build` melden sie ebenfalls.

</details>

<details>
<summary>Wo darf in JSX JavaScript stehen?</summary>

In geschweiften Klammern `{}` als Ausdruck: für Text und für Attributwerte. Anweisungen wie `if` oder `for` stehen außerhalb der Klammern.

</details>

- JSX beschreibt die Oberfläche, `{}` holt JavaScript-Werte hinein; Vite übersetzt JSX in normale JavaScript-Aufrufe.
- TypeScript ergänzt JavaScript um Typen und findet Fehler vor dem Browser; im Browser läuft nur das übersetzte JavaScript.

## JSX: HTML-ähnliche Syntax in JavaScript

Dateien mit JSX tragen die Endung `.tsx`. Der Browser versteht JSX nicht; Vite übersetzt es in Funktionsaufrufe.

```tsx
const element = <h1 className="title">Hallo</h1>;
// wird übersetzt zu (vereinfacht):
// const element = jsx("h1", { className: "title", children: "Hallo" });
```

| HTML | JSX | Grund |
| --- | --- | --- |
| `class="box"` | `className="box"` | `class` ist in JavaScript ein reserviertes Wort |
| `for="name"` | `htmlFor="name"` | `for` ist reserviert |
| `onclick="…"` | `onClick={handleClick}` | camelCase, Funktion statt Text |
| `<img src="a.png">` | `<img src="a.png" />` | jedes Element muss geschlossen sein |
| `style="color: red"` | `style={{ color: "red" }}` | `style` erwartet ein Objekt |
| `<!-- Kommentar -->` | `{/* Kommentar */}` | Kommentar steht als JavaScript in `{}` |

## JavaScript in JSX mit {}

In `{}` steht ein JavaScript-Ausdruck, also alles, was einen Wert ergibt. Das gilt für Text (zwischen den Tags) und für Attribute (`src`, `href`, `className`, `style`).

```tsx
const user = { name: "Anna", avatar: "https://rickandmortyapi.com/api/character/avatar/1.jpeg" };
const profileUrl = "https://react.dev";
const isHighlighted = true;

const App = () => (
  <>
    <h1>Hallo, {user.name}!</h1>                                  {/* Text */}
    <img src={user.avatar} alt={`Avatar von ${user.name}`} />     {/* Attribut */}
    <p>2 + 3 = {2 + 3}</p>                                        {/* Rechnung */}
    <a href={profileUrl}>react.dev</a>
    <p className="note">className ersetzt class.</p>
    <p style={{ color: isHighlighted ? "yellow" : "white" }}>style erwartet ein Objekt.</p>
  </>
);
```

| In `{}` erlaubt (Ausdruck) | Außerhalb von `{}` (Anweisung) |
| --- | --- |
| Variable: `{user.name}` | `if (…) { … }` |
| Rechnung: `{2 + 3}` | `for (…) { … }` |
| Ternary: `{ok ? "ja" : "nein"}` | `const x = 1;` |
| Funktionsaufruf: `{items.map(…)}` | `return` |

`style={{ … }}` besteht aus zwei Teilen: die äußeren Klammern öffnen JavaScript, die inneren sind das Objekt. Eigenschaften stehen in camelCase (`backgroundColor`), Zahlen gelten als Pixel.

Die lauffähige Seite liegt in `src/examples/m01-react-start/l03-jsx-and-typescript-basics/app-jsx-syntax.tsx` (Launcher: `/examples/m01-react-start/l03-jsx-and-typescript-basics/app-jsx-syntax`).

## Wurzelelement, Fragment und Escaping

Eine Komponente gibt genau ein Wurzelelement zurück. Ein Fragment `<>…</>` fasst mehrere Geschwister zusammen, ohne ein zusätzliches Element im DOM zu erzeugen (`<React.Fragment>` ist die lange Schreibweise).

```tsx
// Fehler: zwei Wurzelelemente
// return (<h1>Titel</h1><p>Text</p>);

return (
  <>
    <h1>Titel</h1>
    <p>Text</p>
  </>
);
```

React escapt eingebettete Werte automatisch. Ein Text wie `<script>alert('XSS')</script>` erscheint als sichtbarer Text und wird nicht ausgeführt; das schützt vor Cross-Site-Scripting (XSS).

| Regel für sauberes JSX | Umsetzung |
| --- | --- |
| Logik und Darstellung trennen | Berechnungen vor dem `return`, im JSX nur anzeigen |
| Fragmente statt Wrapper-`div`s | `<>…</>` |
| Einheitliche Namen | Komponenten und ihre Dateien in PascalCase (`TodoItem.tsx`) |
| Typsicherheit | TypeScript statt ungeprüftem JavaScript |

## TypeScript: Typen finden Fehler vor dem Browser

TypeScript ist JavaScript mit statischen Typen. Der Editor und der Build prüfen die Typen; zur Laufzeit entfallen sie.

| Thema | Im Kurs-Repo |
| --- | --- |
| Übersetzen | übernimmt Vite beim Start und beim Build |
| Typprüfung | Editor (VS Code) beim Tippen, `npm run build` (`tsc -b`) |
| Einzelprüfung | `npx tsc -p tsconfig.app.json --noEmit` |
| Globale Installation | nicht nötig (`npm install -g typescript` steht nur in alten Tutorials) |

## Typen im Überblick

```ts
// Grundtypen und Arrays
const title: string = "Counter";
const count: number = 100;
const isRunning: boolean = false;
const todos: string[] = ["essen", "trinken"];

// @ts-expect-error Type 'string' is not assignable to type 'number'
const wrongCount: number = "100";
```

| Typ | Bedeutung | Beispiel |
| --- | --- | --- |
| `string`, `number`, `boolean` | Grundtypen | `let age: number = 30` |
| `string[]` | Array mit Elementtyp | `["a", "b"]` |
| `type` / `interface` | Form eines Objekts | siehe unten |
| `feld?: string` | optionales Feld, darf fehlen | `nickname?: string` |
| `readonly id: number` | nach dem Anlegen nicht änderbar | `readonly id` |
| `"S" \| "M" \| "L"` | Union: nur diese Werte erlaubt | `Status` |
| `(a: number) => number` | Funktionstyp | `const add = …` |
| `any` | schaltet die Prüfung ab, vermeiden | – |

```ts
type Point = { x: number; y: number };

interface Person {
  readonly id: number; // nach dem Anlegen nicht änderbar
  name: string;
  nickname?: string;   // optional
}

const anna: Person = { id: 1, name: "Anna" };

// @ts-expect-error Cannot assign to 'id' because it is a read-only property
anna.id = 2;

// @ts-expect-error Property 'name' is missing in type '{ id: number; }'
const nameless: Person = { id: 2 };

type Status = "Alive" | "Dead" | "unknown";
const status: Status = "Alive";

// @ts-expect-error Type '"Missing"' is not assignable to type 'Status'
const wrongStatus: Status = "Missing";

// Typisierte Funktion: Parameter und Rückgabewert
const add = (a: number, b: number): number => a + b;

// @ts-expect-error Argument of type 'string' is not assignable to parameter of type 'number'
add(1, "2");
```

Die vollständige Datei steht in `src/examples/m01-react-start/l03-jsx-and-typescript-basics/typescript-basics.ts`. Die Zeilen mit `@ts-expect-error` zeigen absichtliche Fehler; ohne die Kommentare markiert der Editor sie rot.

| `type` | `interface` |
| --- | --- |
| beschreibt Objekte, Unions, Funktionen | beschreibt vor allem Objekte |
| `type Point = { … }` | `interface Point { … }` |
| im Kurs Standard für Props und Daten | in vielen Altprojekten und Bibliotheken |

Ein Typ wie `Character` beschreibt die Daten, die Tag 2 aus der Rick-and-Morty-API lädt. Ihn früh zu definieren, lässt den Editor später Feldnamen vorschlagen und Tippfehler melden.

> **Merksatz:** JSX braucht `{}` für JavaScript, TypeScript braucht Typen für Sicherheit; beide verschwinden vor dem Browser in normales JavaScript.

## Fazit

- JSX ist JavaScript: `className`, `onClick`, `style` als Objekt, geschlossene Tags, ein Wurzelelement oder Fragment.
- In `{}` stehen Ausdrücke für Text und Attribute; React escapt eingebettete Werte automatisch.
- TypeScript meldet falsche Typen, fehlende Felder und falsche Argumente vor dem Browser.
- `type` beschreibt Daten, `?` macht Felder optional, Unions beschränken Werte.

Die Übung baut das statische Layout der Counter-App und definiert den Typ `Character`.
