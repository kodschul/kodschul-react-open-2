# Lab 7.1: Von der eigenen Navigation zum Router

**Leitfragen:**

<details>
<summary>Was geht beim Klick auf `<a href>` verloren?</summary>

Der Browser lädt die gesamte Seite neu. Der State aller Komponenten (Zähler, Eingaben, Listen) beginnt wieder bei den Startwerten.

</details>

<details>
<summary>Was zeigt der Network-Tab bei `Link` im Vergleich?</summary>

Bei `<a href>` erscheint eine neue Dokument-Anfrage samt Skripten und Styles. Bei `Link` fehlt sie; die URL ändert sich über die History-API, und die App tauscht nur die Ansicht.

</details>

<details>
<summary>Wie würde man ohne Router zwischen Seiten wechseln?</summary>

Mit einem State, der den aktuellen Pfad speichert, und bedingter Anzeige (`{page === "/todo" && <TodoPage />}`). Die URL, der Zurück-Button und das Neuladen funktionieren dabei nicht mit.

</details>

- Routing ordnet URLs Ansichten zu; in einer Single-Page-App tauscht JavaScript die Ansicht, ohne die Seite neu zu laden.
- React Router liefert dafür `BrowserRouter`, `Routes`, `Route` und `Link`.

## Erst ohne Router

Die Navigation lässt sich mit State bauen. Ein Wert wie `"/todo"` entscheidet, welche Komponente erscheint.

```tsx
const App = () => {
  const [page, setPage] = useState(readPage);   // Startwert aus der aktuellen URL
  const [clicks, setClicks] = useState(0);      // Beweis: geht bei einem Neuladen verloren

  return (
    <main>
      <button onClick={() => setClicks(clicks + 1)}>Zähler: {clicks}</button>

      <button onClick={() => setPage("/todo")}>Todo</button>        {/* nur State: URL bleibt gleich */}
      <a href={`${base}/todo`}>Todo</a>                              {/* neue Seite vom Server */}

      {page === "/todo" && <TodoPage />}
      {page === "/countdown" && <CountdownPage />}
    </main>
  );
};
```

Vollständige Datei: `src/examples/m07-react-router/l01-router-setup-and-links/app-without-router.tsx` (im Launcher: Variante „without router“).

| Technik | URL ändert sich | Neuladen der Seite | Zähler bleibt | Zurück-Button |
| ------- | --------------- | ------------------ | ------------- | ------------- |
| Button + `setPage` | nein | – | ja | verlässt die App |
| `<a href="/todo">` | ja | ja | nein, Start bei 0 | geht |
| `window.location.href = "/todo"` | ja | ja | nein | geht |

- Mit State-Navigation lässt sich keine Seite verlinken oder als Lesezeichen speichern; nach `F5` ist die Startseite wieder da.
- Mit `<a href>` stimmt die URL, aber jeder Klick lädt Dokument, Skripte und Styles neu und setzt den State zurück.

## Mit Router

React Router verbindet beides: eine echte URL und kein Neuladen. Seit Version 8 gibt es nur noch das Paket `react-router`.

```bash
npm install react-router   # im Kurs-Repo bereits installiert
```

```tsx
import { useState } from "react";
import { BrowserRouter, Link, Route, Routes } from "react-router";
import { routerBasename } from "../../../launcher/router-basename";
import { CharactersPage, CountdownPage, HomePage, TodoPage } from "./pages";

const basename = routerBasename(); // im Kurs-Repo: Pfad der Beispiel-App bzw. /playground

const App = () => {
  const [clicks, setClicks] = useState(0);

  return (
    <BrowserRouter basename={basename}>
      <button onClick={() => setClicks(clicks + 1)}>Zähler: {clicks}</button>

      {/* Link: Der Router tauscht die Seite, die App bleibt geladen (Zähler bleibt). */}
      <nav>
        <Link to="/">Start</Link>
        <Link to="/todo">Todo</Link>
        <Link to="/countdown">Countdown</Link>
        <Link to="/characters">Charaktere</Link>
      </nav>

      {/* Gegenüberstellung: a href lädt die ganze Seite neu (Zähler wird zurückgesetzt). */}
      <a href={`${basename}/todo`}>Todo (a href)</a>

      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/todo" element={<TodoPage />} />
        <Route path="/countdown" element={<CountdownPage />} />
        <Route path="/characters" element={<CharactersPage />} />
        <Route path="*" element={<h2>Seite nicht gefunden</h2>} />
      </Routes>
    </BrowserRouter>
  );
};

export default App;
```

Vollständige Datei: `src/examples/m07-react-router/l01-router-setup-and-links/index.tsx`.

| Baustein | Aufgabe |
| -------- | ------- |
| `BrowserRouter` | liest und schreibt die URL über die History-API; umschließt die Teile der App mit Routing |
| `Routes` | wählt aus den enthaltenen `Route`-Einträgen die passende aus |
| `Route path element` | ordnet einen Pfad einer Komponente zu |
| `path="*"` | passt auf alles Übrige: Seite „nicht gefunden“ |
| `Link to` | rendert ein `<a>`, fängt den Klick ab und wechselt die Route ohne Neuladen |
| `basename` | gemeinsamer Pfadanfang; im Kurs-Repo nötig, weil jede App unter einem eigenen Pfad läuft |

- Jede Ansicht ist eine eigene Komponente; die Route verknüpft sie mit dem Pfad.
- Der Zähler bleibt über `Link`-Klicks erhalten, nach einem Klick auf das `<a href>` steht er wieder auf `0`.
- `Link to="/todo"` ergänzt den `basename` selbst; ein einfaches `<a href>` braucht den vollständigen Pfad (`${basename}/todo`).
- In einem normalen Projekt steht `<BrowserRouter>` ohne `basename`; der Helper `routerBasename()` ist eine Eigenheit des Kurs-Repos.

In älterem Code und Tutorials stehen `react-router-dom`, `<Switch>`, `<Route component={…} exact>` und `props.match.params`. Heute heißt es `react-router`, `<Routes>`, `<Route element={…}>` und `useParams()`.

> **Merksatz:** `<a href>` lädt die Seite neu, `Link` wechselt nur die Ansicht.

## Fazit

- Navigation ohne Router speichert den Pfad im State: keine echte URL, kein Zurück-Button, kein Neuladen.
- `<a href>` bringt die URL, kostet aber ein komplettes Neuladen und den State.
- `BrowserRouter` + `Routes` + `Route` + `Link` ergeben echte URLs ohne Neuladen; alle Importe stammen aus `react-router`.

Die Übung baut eine Mini-App mit Router, die die Tag-1-Apps unter `/todo`, `/countdown` und `/characters` einbindet.
