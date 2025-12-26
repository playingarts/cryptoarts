import {
  FC,
  HTMLAttributes,
  createContext,
  useContext,
  useEffect,
  useState,
} from "react";

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
  const [favorites, setFavorites] = useState<Props["favorites"]>();

  const getFavorites: () => Record<string, string[]> = () => {
    const localFavorites: Record<string, string[]> | null = JSON.parse(
      localStorage.getItem(STORAGE_KEY) || "null"
    );

    const favorites = localFavorites === null ? {} : localFavorites;
    return favorites;
  };

  const addItem: Props["addItem"] = (deckSlug, _id) => {
    const existing = favorites ? favorites[deckSlug] || [] : [];

    existing.push(_id);

    const newFav = {
      ...favorites,
      [deckSlug]: Array.from(new Set(existing)),
    };

    setFavorites(newFav);
  };

  const isFavorite: Props["isFavorite"] = (deckSlug, _id) => {
    const existing = favorites ? favorites[deckSlug] || [] : [];

    if (existing) {
      return existing.findIndex((item) => item === _id) !== -1;
    }

    return false;
  };

  const removeItem: Props["removeItem"] = (deckSlug, _id) => {
    const deck = (favorites ? favorites[deckSlug] || [] : []).filter(
      (id) => id !== _id
    );
    const newFav = {
      ...favorites,
      [deckSlug]: deck,
    };
    if (deck.length === 0) {
      delete newFav[deckSlug];
    }

    setFavorites(newFav);
  };

  useEffect(() => {
    if (!favorites) {
      setFavorites(getFavorites());
    } else {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(favorites));
    }
  }, [favorites]);

  return (
    <FavoritesContext.Provider
      value={{ favorites, addItem, removeItem, isFavorite }}
    >
      {children}
    </FavoritesContext.Provider>
  );
};
