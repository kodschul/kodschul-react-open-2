import { useEffect, useState } from "react";
import axios from "axios";
import { API_BASE_URL, type Character, type CharacterPage } from "../shared/character";

const api = axios.create({ baseURL: API_BASE_URL, timeout: 10000 });

// TODO: Diese Galerie auf useQuery umbauen (QueryClientProvider, queryKey ["characters", page]).
const App = () => {
  const [characters, setCharacters] = useState<Character[]>([]);
  const [page, setPage] = useState(1);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let ignore = false;

    const loadCharacters = async () => {
      setIsLoading(true);
      setError(null);
      try {
        const response = await api.get<CharacterPage>("/character", { params: { page } });
        if (!ignore) setCharacters(response.data.results);
      } catch (e) {
        if (!ignore) setError(e instanceof Error ? e.message : "Unbekannter Fehler");
      } finally {
        if (!ignore) setIsLoading(false);
      }
    };
    loadCharacters();

    return () => {
      ignore = true;
    };
  }, [page]);

  return (
    <main className="p-8">
      <h1 className="mb-4 text-3xl font-bold">The Rick and Morty API</h1>
      <div className="mb-4 flex items-center gap-4">
        <button
          className="rounded bg-blue-600 px-4 py-2 text-white disabled:bg-gray-400"
          onClick={() => setPage(page - 1)}
          disabled={page === 1}
        >
          Zurück
        </button>
        <span className="font-semibold">Seite {page}</span>
        <button
          className="rounded bg-blue-600 px-4 py-2 text-white"
          onClick={() => setPage(page + 1)}
        >
          Weiter
        </button>
      </div>
      {isLoading && <p>Lade …</p>}
      {error && <p className="text-red-600">Fehler beim Laden: {error}</p>}
      <div className="grid grid-cols-2 gap-4 md:grid-cols-4 lg:grid-cols-5">
        {!isLoading &&
          characters.map((character) => (
            <div key={character.id}>
              <img
                className="h-48 w-48 rounded object-cover"
                src={character.image}
                alt={character.name}
                width={200}
                height={200}
              />
              <div>{character.name}</div>
            </div>
          ))}
      </div>
    </main>
  );
};

export default App;
