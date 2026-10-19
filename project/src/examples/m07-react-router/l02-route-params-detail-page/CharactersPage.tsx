import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { Link } from "react-router";
import { fetchCharacterPage } from "./api";

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
          // Jede Karte ist ein Link auf die Detailseite dieses Charakters.
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

export default CharactersPage;
