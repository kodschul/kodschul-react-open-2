import { useQuery } from "@tanstack/react-query";
import { Link, useParams } from "react-router";
import { fetchCharacterDemo } from "./loader";

// Variante aus Lab 7.2: Die Seite erscheint sofort, die Daten laden danach.
const CharacterDetailQueryPage = () => {
  const { id = "" } = useParams();
  const { data: character, isPending, error } = useQuery({
    queryKey: ["character", id],
    queryFn: () => fetchCharacterDemo(id),
    retry: false,
  });

  return (
    <section>
      <Link className="text-blue-600 underline" to="/characters">
        ← Zurück zur Galerie
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

export default CharacterDetailQueryPage;
