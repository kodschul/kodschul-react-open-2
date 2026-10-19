import { Link, useLocation } from "react-router";
import type { Character } from "../../../shared/character";
import FavoriteButton from "./FavoriteButton";

type Props = {
  character: Character;
};

const CharacterCard = ({ character }: Props) => {
  // Die Query-Parameter (Seite, Status) wandern zur Detailseite mit und wieder zurück.
  const { search } = useLocation();

  return (
    <li className="flex flex-col gap-2 rounded-lg border bg-white p-3 shadow-sm">
      <Link to={{ pathname: `/characters/${character.id}`, search }} className="flex flex-col gap-2">
        <img src={character.image} alt={character.name} className="w-full rounded" />
        <h2 className="font-semibold">{character.name}</h2>
      </Link>
      <p className="text-sm text-gray-600">
        {character.status} · {character.species}
      </p>
      <FavoriteButton characterId={character.id} />
    </li>
  );
};

export default CharacterCard;
