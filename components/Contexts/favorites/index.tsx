"use client";

import {
  FC,
  HTMLAttributes,
  createContext,
  useCallback,
  useContext,
} from "react";
import { useLocalStorage } from "../../../hooks/useLocalStorage";

export interface Props {
  isFavorite: (deckSlug: string, _id: string) => boolean;
  addItem: (deckSlug: string, _id: string) => void;
  removeItem: (deckSlug: string, _id: string) => void;
  favorites: Record<string, string[]> | undefined;
}

export const FavoritesContext = createContext({} as Props);

export const useFavorites = () => {
  return useContext(FavoritesContext);
};

const STORAGE_KEY = "cryptoarts:favorites";

export const FavoritesProvider: FC<HTMLAttributes<HTMLElement>> = ({
  children,
}) => {
  const [favorites, setFavorites] = useLocalStorage<Record<string, string[]>>(
    STORAGE_KEY,
    {}
  );

  const addItem: Props["addItem"] = useCallback(
    (deckSlug, _id) => {
      // Prevent adding empty/invalid IDs
      if (!deckSlug || !_id) return;

      setFavorites((prev) => {
        const existing = prev[deckSlug] || [];
        return {
          ...prev,
          [deckSlug]: Array.from(new Set([...existing, _id])),
        };
      });
    },
    [setFavorites]
  );

  const isFavorite: Props["isFavorite"] = useCallback(
    (deckSlug, _id) => {
      const existing = favorites ? favorites[deckSlug] || [] : [];
      return existing.includes(_id);
    },
    [favorites]
  );

  const removeItem: Props["removeItem"] = useCallback(
    (deckSlug, _id) => {
      // Prevent removing with empty/invalid IDs
      if (!deckSlug || !_id) return;

      setFavorites((prev) => {
        const deck = (prev[deckSlug] || []).filter((id) => id !== _id);
        const newFav = { ...prev, [deckSlug]: deck };
        if (deck.length === 0) {
          delete newFav[deckSlug];
        }
        return newFav;
      });
    },
    [setFavorites]
  );

  return (
    <FavoritesContext.Provider
      value={{ favorites, addItem, removeItem, isFavorite }}
    >
      {children}
    </FavoritesContext.Provider>
  );
};
