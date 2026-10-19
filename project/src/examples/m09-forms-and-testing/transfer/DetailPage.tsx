import { useQuery } from "@tanstack/react-query";
import { Link, useLocation, useParams } from "react-router";
import FavoriteButton from "./FavoriteButton";
import { fetchCharacter } from "./api";

const DetailPage = () => {
  const { id = "" } = useParams();
  const { search } = useLocation();

  // Die ID gehört in den queryKey: Jede Detailseite hat ihren eigenen Cache-Eintrag.
  const { data: character, isPending, error } = useQuery({
    queryKey: ["character", id],
    queryFn: () => fetchCharacter(id),
  });

  return (
    <section>
      <Link to={{ pathname: "/", search }} className="text-blue-600 underline">
        ← Zurück zur Galerie
      </Link>

      {isPending && <p className="mt-4">Lade …</p>}
      {error && <p className="mt-4 text-red-600">Charakter nicht gefunden.</p>}

      {character && (
        <article className="mt-4 flex max-w-md flex-col gap-3 rounded-lg border bg-white p-4 shadow-sm">
          <img src={character.image} alt={character.name} className="w-full rounded" />
          <h1 className="text-2xl font-bold">{character.name}</h1>
          <p>Status: {character.status}</p>
          <p>Spezies: {character.species}</p>
          <FavoriteButton characterId={character.id} />
        </article>
      )}
    </section>
  );
};

export default DetailPage;
