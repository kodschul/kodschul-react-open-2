import { Link, useLoaderData } from "react-router";
import type { characterLoader } from "./loader";

// Die Daten sind beim Rendern schon da: kein isPending, kein eigener Ladezustand in der Komponente.
const CharacterDetailLoaderPage = () => {
  const character = useLoaderData<typeof characterLoader>();

  return (
    <section>
      <Link className="text-blue-600 underline" to="/characters">
        ← Zurück zur Galerie
      </Link>
      <h1 className="mt-4 mb-2 text-3xl font-bold">{character.name}</h1>
      <img
        className="mb-2 h-64 w-64 rounded object-cover"
        src={character.image}
        alt={character.name}
        width={256}
        height={256}
      />
      <p>Status: {character.status}</p>
      <p>Spezies: {character.species}</p>
    </section>
  );
};

export default CharacterDetailLoaderPage;
