import { QueryClient, QueryClientProvider, useQuery } from "@tanstack/react-query";
import { BrowserRouter, Link, Navigate, Route, Routes, useParams, useSearchParams } from "react-router";
import { fetchCharacter, fetchCharacterPage } from "./api";

// Varianten (app-*) liegen eine Ebene tiefer als index.tsx: routerBasename() reicht hier nicht, daher 5 Pfadsegmente.
const basename = window.location.pathname.split("/").slice(0, 5).join("/");
const queryClient = new QueryClient();

// Erweiterung: Die aktuelle Seite liegt in der URL (?page=3) statt im State.
const CharactersPage = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  // Fehlt der Parameter oder ist er keine Zahl, startet die Galerie auf Seite 1.
  const page = Number(searchParams.get("page")) || 1;

  const { data, isPending, error } = useQuery({
    queryKey: ["characters", page],
    queryFn: () => fetchCharacterPage(page),
    staleTime: 60_000,
  });

  return (
    <section>
      <h1 className="mb-4 text-3xl font-bold">Charaktere</h1>
      <div className="mb-4 flex items-center gap-4">
        <button
          className="rounded bg-blue-600 px-4 py-2 text-white disabled:bg-gray-400"
          onClick={() => setSearchParams({ page: String(page - 1) })}
          disabled={page === 1}
        >
          Zurück
        </button>
        <span className="font-semibold">Seite {page}</span>
        <button
          className="rounded bg-blue-600 px-4 py-2 text-white"
          onClick={() => setSearchParams({ page: String(page + 1) })}
        >
          Weiter
        </button>
      </div>
      {isPending && <p>Lade …</p>}
      {error && <p className="text-red-600">Fehler beim Laden: {error.message}</p>}
      <div className="grid grid-cols-2 gap-4 md:grid-cols-4 lg:grid-cols-5">
        {data?.results.map((character) => (
          // Die Seite reist als Query-Parameter zur Detailseite mit.
          <Link key={character.id} to={`/characters/${character.id}?page=${page}`}>
            <img
              className="h-48 w-48 rounded object-cover"
              src={character.image}
              alt={character.name}
              width={200}
              height={200}
            />
            <div>{character.name}</div>
          </Link>
        ))}
      </div>
    </section>
  );
};

const CharacterDetailPage = () => {
  const { id = "" } = useParams();
  const [searchParams] = useSearchParams();
  const page = searchParams.get("page") ?? "1";

  const { data: character, isPending, error } = useQuery({
    queryKey: ["character", id],
    queryFn: () => fetchCharacter(id),
    retry: false,
  });

  return (
    <section>
      <Link className="text-blue-600 underline" to={`/characters?page=${page}`}>
        ← Zurück zur Galerie (Seite {page})
      </Link>
      {isPending && <p className="mt-4">Lade …</p>}
      {error && <p className="mt-4 text-red-600">Fehler beim Laden: {error.message}</p>}
      {character && (
        <div className="mt-4">
          <h1 className="mb-2 text-3xl font-bold">{character.name}</h1>
          <img
            className="mb-2 h-64 w-64 rounded object-cover"
            src={character.image}
            alt={character.name}
            width={256}
            height={256}
          />
          <p>Status: {character.status}</p>
          <p>Spezies: {character.species}</p>
        </div>
      )}
    </section>
  );
};

const App = () => (
  <QueryClientProvider client={queryClient}>
    <BrowserRouter basename={basename}>
      <main className="p-8">
        <Routes>
          <Route path="/" element={<Navigate to="/characters" replace />} />
          <Route path="/characters" element={<CharactersPage />} />
          <Route path="/characters/:id" element={<CharacterDetailPage />} />
        </Routes>
      </main>
    </BrowserRouter>
  </QueryClientProvider>
);

export default App;
