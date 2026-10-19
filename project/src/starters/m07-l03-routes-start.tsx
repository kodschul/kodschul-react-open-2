import { useState } from "react";
import { QueryClient, QueryClientProvider, useQuery } from "@tanstack/react-query";
import axios from "axios";
import { BrowserRouter, Link, Route, Routes, useParams } from "react-router";
import { routerBasename } from "../launcher/router-basename";
import { API_BASE_URL, type Character, type CharacterPage } from "../shared/character";

const api = axios.create({ baseURL: API_BASE_URL, timeout: 10000 });

const fetchCharacterPage = async (page: number): Promise<CharacterPage> => {
  const response = await api.get<CharacterPage>("/character", { params: { page } });
  return response.data;
};

const fetchCharacter = async (id: string): Promise<Character> => {
  const response = await api.get<Character>(`/character/${id}`);
  return response.data;
};

const CharactersPage = () => {
  const [page, setPage] = useState(1);
  const { data, isPending } = useQuery({
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
      <div className="grid grid-cols-2 gap-4 md:grid-cols-4 lg:grid-cols-5">
        {data?.results.map((character) => (
          <Link key={character.id} to={`/characters/${character.id}`}>
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
  const { data: character, isPending } = useQuery({
    queryKey: ["character", id],
    queryFn: () => fetchCharacter(id),
    retry: false,
  });

  return (
    <section>
      <Link className="text-blue-600 underline" to="/characters">
        ← Zurück zur Galerie
      </Link>
      {isPending && <p className="mt-4">Lade …</p>}
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
        </div>
      )}
    </section>
  );
};

const queryClient = new QueryClient();

// TODO: BrowserRouter/Routes durch createBrowserRouter + RouterProvider mit Route-Objekten ersetzen.
const App = () => (
  <QueryClientProvider client={queryClient}>
    <BrowserRouter basename={routerBasename()}>
      <main className="p-8">
        <Routes>
          <Route path="/characters" element={<CharactersPage />} />
          <Route path="/characters/:id" element={<CharacterDetailPage />} />
        </Routes>
      </main>
    </BrowserRouter>
  </QueryClientProvider>
);

export default App;
