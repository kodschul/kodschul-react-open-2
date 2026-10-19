import { useFavorites } from "./favorites-context";

type Props = {
  characterId: number;
};

const FavoriteButton = ({ characterId }: Props) => {
  const { isFavorite, toggleFavorite } = useFavorites();
  const active = isFavorite(characterId);

  return (
    <button
      aria-pressed={active}
      onClick={() => toggleFavorite(characterId)}
      className={`rounded border px-3 py-1 text-sm ${
        active ? "border-yellow-500 bg-yellow-100" : "hover:bg-gray-100"
      }`}
    >
      {active ? "★ Favorit" : "☆ Merken"}
    </button>
  );
};

export default FavoriteButton;
