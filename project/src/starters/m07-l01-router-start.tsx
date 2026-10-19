// Platzhalter: Hier stehen später die eigenen Tag-1-Apps (Import aus eigenen Dateien).
const HomePage = () => <h2 className="text-xl font-semibold">Startseite</h2>;
const TodoPage = () => <h2 className="text-xl font-semibold">Todo (Platzhalter)</h2>;
const CountdownPage = () => <h2 className="text-xl font-semibold">Countdown (Platzhalter)</h2>;
const CharactersPage = () => <h2 className="text-xl font-semibold">Charaktere (Platzhalter)</h2>;

// TODO: Aus "react-router" BrowserRouter, Link, Routes und Route importieren, Navigation und Routen ergänzen.
// BrowserRouter braucht basename={routerBasename()} (Import: ../launcher/router-basename).
// Bisher stehen alle Seiten untereinander.
const App = () => (
  <main className="p-8">
    <h1 className="mb-4 text-3xl font-bold">Meine Apps</h1>
    <HomePage />
    <TodoPage />
    <CountdownPage />
    <CharactersPage />
  </main>
);

export default App;
