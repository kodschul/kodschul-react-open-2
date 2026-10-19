# JavaScript-, JSX- und TypeScript-Cheatsheet

Schnellreferenz für Modul 1 (Projektstart, JavaScript, JSX, TypeScript).

## Projekt und Befehle

| Befehl | Wirkung |
| --- | --- |
| `npm install` | Pakete aus `package.json` nach `node_modules/` laden |
| `npm run dev` | Dev-Server mit Hot Reload starten (`http://localhost:5173`) |
| `npm run build` | Typen prüfen (`tsc -b`) und Build in `dist/` erzeugen |
| `npm run lint` | ESLint ausführen |
| `npm create vite@latest <name> -- --template react-ts` | neues Vite-Projekt mit React und TypeScript anlegen |
| `node <datei>.js` | JavaScript-Datei ohne Browser ausführen |
| `npx tsc -p tsconfig.app.json --noEmit` | Typen prüfen, ohne Dateien zu erzeugen |
| `/` | Startseite des Kurs-Repos (Liste aller Beispiele) |
| `/examples/<modul>/<lab>` | Beispiel-App eines Labs |
| `/playground` | Arbeitsdatei `src/playground/App.tsx` |

## Einstiegspunkt

| Datei / Zeile | Wirkung |
| --- | --- |
| `<div id="root"></div>` in `index.html` | Wurzelelement, in das React rendert |
| `<script type="module" src="/src/main.tsx">` | lädt den Einstiegspunkt |
| `createRoot(document.getElementById("root")!).render(…)` | rendert die oberste Komponente |
| `<StrictMode>` | zusätzliche Prüfungen in der Entwicklung (doppeltes Rendern) |

## Variablen und Vergleiche

| Syntax | Wirkung |
| --- | --- |
| `const x = 1;` | Variable ohne Neuzuweisung (Inhalt von Objekten/Arrays bleibt änderbar) |
| `let x = 1;` | Variable mit Neuzuweisung |
| `typeof x` | Typ als Text (`"string"`, `"number"`, `"boolean"`, `"object"`, …) |
| `Array.isArray(x)` | prüft, ob `x` ein Array ist |
| `a === b` / `a !== b` | Vergleich mit Typ und Wert (Standard) |
| `a == b` | Vergleich mit Typumwandlung (vermeiden) |
| `a && b`, `a \|\| b`, `!a` | und, oder, nicht |
| `cond ? a : b` | Ternary: `a` bei wahr, sonst `b` |

## Funktionen

| Syntax | Wirkung |
| --- | --- |
| `function f(a) { return a; }` | Funktionsdeklaration |
| `const f = function (a) { return a; };` | anonyme Funktion in Variable |
| `const f = (a) => a * 2;` | Arrow Function, ein Ausdruck ohne `return` |
| `const f = (a) => { return a; };` | Arrow Function mit Block |
| `apply(5, (n) => n * 2)` | Funktion als Argument übergeben |

## Arrays, Spread und Destructuring

| Syntax | Wirkung |
| --- | --- |
| `arr.map((x) => x * 2)` | neues Array, gleiche Länge, Ergebnis je Element |
| `arr.filter((x) => x > 1)` | neues Array mit den passenden Elementen |
| `["neu", ...arr]` | neues Array, `"neu"` vorne |
| `[...arr, "neu"]` | neues Array, `"neu"` hinten |
| `{ ...obj, name: "Neu" }` | Objekt-Kopie mit geändertem Feld |
| `Object.assign({}, obj, { name: "Neu" })` | Objekt-Kopie (ältere Schreibweise) |
| `const [a, b] = arr;` | Array-Destructuring nach Position |
| `const { name, city } = obj;` | Objekt-Destructuring nach Name |
| `` `Hallo ${name}` `` | Template Literal mit eingebettetem Ausdruck |
| `arr.push(x)`, `arr.splice(…)` | verändern das Original (in React-State vermeiden) |

## JSX

| Syntax | Wirkung |
| --- | --- |
| `<h1>Hallo, {name}!</h1>` | JavaScript-Ausdruck als Text |
| `<img src={url} alt={text} />` | Ausdruck als Attributwert, Element geschlossen |
| `<a href={url}>Link</a>` | Link mit dynamischem Ziel |
| `className="box"` | CSS-Klasse (statt `class`) |
| `style={{ color: "red", fontSize: 24 }}` | Inline-Stil als Objekt in camelCase |
| `<>…</>` | Fragment: mehrere Geschwister ohne Wrapper-Element |
| `{/* Kommentar */}` | Kommentar im JSX |
| `{cond ? <A /> : <B />}` | Ausdruck statt `if` im JSX |
| `const App = () => <main>…</main>;` | Komponente: Funktion mit Großbuchstaben, gibt JSX zurück |
| `export default App;` | Komponente als Standardexport (Playground und Beispiele) |

## TypeScript

| Syntax | Wirkung |
| --- | --- |
| `let n: number = 1;` | Variable mit Typ |
| `string`, `number`, `boolean` | Grundtypen |
| `string[]` | Array aus Texten |
| `type Point = { x: number; y: number };` | Typ für Objektform |
| `interface Person { name: string }` | Objektform als Interface |
| `nickname?: string` | optionales Feld |
| `readonly id: number` | Feld nach dem Anlegen nicht änderbar |
| `type Status = "Alive" \| "Dead" \| "unknown";` | Union: nur diese Werte erlaubt |
| `(a: number, b: number): number => a + b` | Funktion mit typisierten Parametern und Rückgabewert |
| `// @ts-expect-error <Grund>` | erwartet einen Typfehler in der nächsten Zeile (nur für Demos) |
