# Lab 7.1 – Lösung: Mini-App mit BrowserRouter

## Aufgabe 1: Ausgangszustand

Die Seite zeigt „Startseite“, „Todo (Platzhalter)“, „Countdown (Platzhalter)“ und „Charaktere (Platzhalter)“ untereinander. Die URL bleibt `/playground`: Ohne Router gibt es keine Zuordnung von Adresse und Ansicht.

## Aufgabe 2: Eigene Apps als Dateien

```tsx
// src/playground/todo-app.tsx (Inhalt: eigene Lösung aus Lab 2.4)
const TodoApp = () => {
  /* … */
};
export default TodoApp;
```

Entsprechend `countdown-app.tsx` und `characters-app.tsx`. Die Relativpfade zu `../shared/…` stimmen, weil `playground/` und `starters/` auf derselben Ebene liegen.

## Aufgabe 3 bis 7: Router einrichten

```tsx
import { BrowserRouter, Link, Route, Routes } from "react-router";
import { routerBasename } from "../launcher/router-basename";
import CharactersApp from "./characters-app";
import CountdownApp from "./countdown-app";
import TodoApp from "./todo-app";

const HomePage = () => <h2 className="text-xl font-semibold">Startseite</h2>;

const App = () => (
  <BrowserRouter basename={routerBasename()}>
    <main className="p-8">
      <h1 className="mb-4 text-3xl font-bold">Meine Apps</h1>
      <nav className="mb-6 flex gap-3">
        <Link className="text-blue-600 underline" to="/">Start</Link>
        <Link className="text-blue-600 underline" to="/todo">Todo</Link>
        <Link className="text-blue-600 underline" to="/countdown">Countdown</Link>
        <Link className="text-blue-600 underline" to="/characters">Charaktere</Link>
      </nav>

      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/todo" element={<TodoApp />} />
        <Route path="/countdown" element={<CountdownApp />} />
        <Route path="/characters" element={<CharactersApp />} />
        <Route path="*" element={<h2 className="text-xl font-semibold">Seite nicht gefunden</h2>} />
      </Routes>
    </main>
  </BrowserRouter>
);

export default App;
```

| Entscheidung | Begründung |
| ------------ | ---------- |
| `basename={routerBasename()}` | Der Playground läuft unter `/playground`; ohne `basename` passt kein Pfad zur Route |
| `Link to="/todo"` statt `to="/playground/todo"` | Der Router ergänzt den `basename` selbst |
| Route `*` | niedrigste Priorität: greift nur, wenn keine andere Route passt (die Reihenfolge der Routen ist egal) |

Ohne eigene Apps bleiben `HomePage`, `TodoPage` usw. als Platzhalter-Komponenten im Code stehen.

## Aufgabe 8: Zähler und a-href-Navigation

```tsx
const [clicks, setClicks] = useState(0);

<button className="mb-4 rounded border px-3 py-1" onClick={() => setClicks(clicks + 1)}>
  Zähler: {clicks}
</button>

{/* Gegenüberstellung: a href lädt die ganze Seite neu */}
<nav className="mb-6 flex gap-3">
  <a className="text-blue-600 underline" href={`${routerBasename()}/todo`}>Todo (a href)</a>
  <a className="text-blue-600 underline" href={`${routerBasename()}/characters`}>Charaktere (a href)</a>
</nav>
```

Das `<a href>` kennt den `basename` nicht und braucht den vollständigen Pfad (`/playground/todo`). `useState` steht in `App`, daher innerhalb der Komponente, nicht im Modul.

## Aufgabe 9: Zähler vergleichen

| Aktion | URL danach | Zähler |
| ------ | ---------- | ------ |
| Zähler auf 3 erhöhen | `/playground` | `3` |
| `Link` „Todo“ | `/playground/todo` | `3` (State bleibt) |
| `<a href>` „Charaktere (a href)“ | `/playground/characters` | `0` (Seite neu geladen) |

## Aufgabe 10: Network-Tab

| Klick | Neue Einträge |
| ----- | ------------- |
| `Link` | keine Dokument-Anfrage; höchstens Daten-Anfragen der neuen Seite |
| `<a href>` | Dokument-Anfrage (`document`) plus erneute Skript- und Style-Anfragen |

## Aufgabe 11: Direkt-URL

- `http://localhost:5173/playground/todo` zeigt die Todo-Seite: Der Dev-Server liefert für jeden Pfad dieselbe `index.html`, der Router wählt dann die Ansicht.
- `http://localhost:5173/playground/gibt-es-nicht` zeigt „Seite nicht gefunden“ (Route `*`).

Hinweis: Ein echtes Hosting braucht die gleiche Regel „alle Pfade auf `index.html`“, sonst antwortet der Server beim Neuladen mit 404.

Referenz-App: `src/examples/m07-react-router/l01-router-setup-and-links/index.tsx`
