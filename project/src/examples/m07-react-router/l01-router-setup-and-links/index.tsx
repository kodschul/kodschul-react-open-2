import { useState } from "react";
import { BrowserRouter, Link, Route, Routes } from "react-router";
import { routerBasename } from "../../../launcher/router-basename";
import { CharactersPage, CountdownPage, HomePage, TodoPage } from "./pages";

// Alle Routen hängen unter diesem Pfad (Launcher: /examples/…, Playground: /playground).
const basename = routerBasename();

const App = () => {
  const [clicks, setClicks] = useState(0);

  return (
    <BrowserRouter basename={basename}>
      <main className="p-8">
        <button className="mb-4 rounded border px-3 py-1" onClick={() => setClicks(clicks + 1)}>
          Zähler: {clicks}
        </button>

        {/* Link: Der Router tauscht die Seite, die App bleibt geladen (Zähler bleibt). */}
        <nav className="mb-2 flex gap-3">
          <span className="font-semibold">Link:</span>
          <Link className="text-blue-600 underline" to="/">
            Start
          </Link>
          <Link className="text-blue-600 underline" to="/todo">
            Todo
          </Link>
          <Link className="text-blue-600 underline" to="/countdown">
            Countdown
          </Link>
          <Link className="text-blue-600 underline" to="/characters">
            Charaktere
          </Link>
        </nav>

        {/* Gegenüberstellung: a href lädt die ganze Seite neu (Zähler wird zurückgesetzt). */}
        <nav className="mb-6 flex gap-3">
          <span className="font-semibold">a href:</span>
          <a className="text-blue-600 underline" href={`${basename}/todo`}>
            Todo
          </a>
          <a className="text-blue-600 underline" href={`${basename}/characters`}>
            Charaktere
          </a>
        </nav>

        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/todo" element={<TodoPage />} />
          <Route path="/countdown" element={<CountdownPage />} />
          <Route path="/characters" element={<CharactersPage />} />
          <Route path="*" element={<h2 className="text-xl font-semibold">Seite nicht gefunden</h2>} />
        </Routes>
      </main>
    </BrowserRouter>
  );
};

export default App;
