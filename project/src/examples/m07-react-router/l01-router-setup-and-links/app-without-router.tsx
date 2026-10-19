import { useState } from "react";
import { CharactersPage, CountdownPage, HomePage, TodoPage } from "./pages";

// Basis dieser Beispiel-App: /examples/m07-react-router/l01-router-setup-and-links/app-without-router
const base = window.location.pathname.split("/").slice(0, 5).join("/");
const readPage = () => window.location.pathname.slice(base.length) || "/";

// Navigation ohne Router: Der Pfad liegt als String im State, die URL ändert sich dabei nicht.
const App = () => {
  const [page, setPage] = useState(readPage);
  const [clicks, setClicks] = useState(0);

  return (
    <main className="p-8">
      <button className="mb-4 rounded border px-3 py-1" onClick={() => setClicks(clicks + 1)}>
        Zähler: {clicks}
      </button>

      <nav className="mb-2 flex gap-3">
        <span className="font-semibold">Buttons (State):</span>
        <button className="text-blue-600 underline" onClick={() => setPage("/todo")}>
          Todo
        </button>
        <button className="text-blue-600 underline" onClick={() => setPage("/countdown")}>
          Countdown
        </button>
        <button className="text-blue-600 underline" onClick={() => setPage("/characters")}>
          Charaktere
        </button>
      </nav>
      <nav className="mb-6 flex gap-3">
        <span className="font-semibold">Links (a href):</span>
        <a className="text-blue-600 underline" href={`${base}/todo`}>
          Todo
        </a>
        <a className="text-blue-600 underline" href={`${base}/countdown`}>
          Countdown
        </a>
        <a className="text-blue-600 underline" href={`${base}/characters`}>
          Charaktere
        </a>
      </nav>

      {page === "/" && <HomePage />}
      {page === "/todo" && <TodoPage />}
      {page === "/countdown" && <CountdownPage />}
      {page === "/characters" && <CharactersPage />}
    </main>
  );
};

export default App;
