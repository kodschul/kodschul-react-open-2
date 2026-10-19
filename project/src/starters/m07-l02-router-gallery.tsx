import { useState } from "react";
import { QueryClient, QueryClientProvider, useQuery } from "@tanstack/react-query";
import axios from "axios";
import { BrowserRouter, Navigate, Route, Routes } from "react-router";
import { routerBasename } from "../launcher/router-basename";
import { API_BASE_URL, type CharacterPage } from "../shared/character";

const api = axios.create({ baseURL: API_BASE_URL, timeout: 10000 });

const fetchCharacterPage = async (page: number): Promise<CharacterPage> => {
  const response = await api.get<CharacterPage>("/character", { params: { page } });
  return response.data;
};

const CharactersPage = () => {
  const [page, setPage] = useState(1);
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
      {isPending && <p>Lade …</p>}
      {error && <p className="text-red-600">Fehler beim Laden: {error.message}</p>}
      <div className="grid grid-cols-2 gap-4 md:grid-cols-4 lg:grid-cols-5">
        {data?.results.map((character) => (
          // TODO: Die Karte zu einem Link auf /characters/<id> machen.
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
    </section>
  );
};

const queryClient = new QueryClient();

// TODO: Route /characters/:id mit einer Detailseite ergänzen (useParams + useQuery).
const App = () => (
  <QueryClientProvider client={queryClient}>
    <BrowserRouter basename={routerBasename()}>
      <main className="p-8">
        <Routes>
          <Route path="/" element={<Navigate to="/characters" replace />} />
          <Route path="/characters" element={<CharactersPage />} />
        </Routes>
      </main>
    </BrowserRouter>
  </QueryClientProvider>
);

export default App;
