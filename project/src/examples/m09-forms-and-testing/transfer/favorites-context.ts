import { createContext, useContext } from "react";

export type FavoritesState = {
  favoriteIds: number[];
  isFavorite: (id: number) => boolean;
  toggleFavorite: (id: number) => void;
};

export const FavoritesContext = createContext<FavoritesState | null>(null);

// Schnittstelle für alle Komponenten: kein useContext, keine null-Prüfung im Aufrufer.
export const useFavorites = (): FavoritesState => {
  const favorites = useContext(FavoritesContext);
  if (favorites === null) {
    throw new Error("useFavorites muss innerhalb von <FavoritesProvider> aufgerufen werden.");
  }
  return favorites;
};
