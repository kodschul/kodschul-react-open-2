import { useState, type ReactNode } from "react";
import { FavoritesContext } from "./favorites-context";

type Props = {
  children: ReactNode;
};

// Hält die Favoriten (nur IDs) und stellt sie dem gesamten Baum bereit.
const FavoritesProvider = ({ children }: Props) => {
  const [favoriteIds, setFavoriteIds] = useState<number[]>([]);

  const isFavorite = (id: number) => favoriteIds.includes(id);
  const toggleFavorite = (id: number) =>
    setFavoriteIds((prev) => (prev.includes(id) ? prev.filter((el) => el !== id) : [...prev, id]));

  return <FavoritesContext value={{ favoriteIds, isFavorite, toggleFavorite }}>{children}</FavoritesContext>;
};

export default FavoritesProvider;
