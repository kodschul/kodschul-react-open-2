import { useState } from "react";
import { QueryClient, QueryClientProvider, useQuery } from "@tanstack/react-query";
import axios from "axios";
import { API_BASE_URL, type CharacterPage } from "../../../shared/character";

const api = axios.create({ baseURL: API_BASE_URL, timeout: 10000 });

// DEMO-SCHALTER: true simuliert ein langsames Netz (2 Sekunden Verzögerung pro Anfrage).
const SLOW_DEMO = false;

// Die Query-Funktion enthält nur den Request; Laden, Fehler und Cache übernimmt useQuery.
const fetchCharacters = async (page: number): Promise<CharacterPage> => {
  if (SLOW_DEMO) await new Promise((resolve) => setTimeout(resolve, 2000));
  const response = await api.get<CharacterPage>("/character", { params: { page } });
  return response.data;
};

const Gallery = () => {
  const [page, setPage] = useState(1);

  const { data, isPending, isLoading, isFetching, error } = useQuery({
    // Der Key enthält die Seite: Jede Seite hat ihren eigenen Cache-Eintrag.
    queryKey: ["characters", page],
    queryFn: () => fetchCharacters(page),
    // Eine Minute gilt der Eintrag als frisch: Zurückblättern löst keinen neuen Request aus.
    staleTime: 60_000,
  });

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
      <p className="mb-4 font-mono text-sm">
        isPending: {String(isPending)} · isLoading: {String(isLoading)} · isFetching:{" "}
        {String(isFetching)}
      </p>
      {isPending && <p>Lade …</p>}
      {error && <p className="text-red-600">Fehler beim Laden: {error.message}</p>}
      <div className="grid grid-cols-2 gap-4 md:grid-cols-4 lg:grid-cols-5">
        {data?.results.map((character) => (
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

// Der Client hält den Cache; der Provider macht ihn für alle Komponenten darunter verfügbar.
const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <Gallery />
  </QueryClientProvider>
);

export default App;
