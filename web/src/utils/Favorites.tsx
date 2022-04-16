import { filter, uniq } from "ramda";
import {
  createContext,
  ReactNode,
  useCallback,
  useContext,
  useMemo,
  useState,
} from "react";
import { noop } from "../cross-cutting/Noop";
import { FavoriteStorage } from "../domain/FavoriteStorage";
import { useService } from "./Services";

const FavoritesContext = createContext<{
  favorites: string[];
  addFavorite: (favorite: string) => void;
  removeFavorite: (favorite: string) => void;
}>({
  favorites: [],
  addFavorite: noop,
  removeFavorite: noop,
});

export const FavoritesProvider = ({ children }: { children: ReactNode }) => {
  const favoritesStorage = useService(FavoriteStorage);
  const [favorites, setFavorites] = useState<string[]>(() =>
    favoritesStorage.getFavorites(),
  );

  const addFavorite = useCallback(
    (favorite: string) => {
      setFavorites((favs) => {
        const newFavs = uniq([...favs, favorite]);
        favoritesStorage.save(newFavs);
        return newFavs;
      });
    },
    [favoritesStorage],
  );

  const removeFavorite = useCallback(
    (favorite: string) => {
      setFavorites((favs) => {
        const newFavs = filter((s: string) => s !== favorite)(favs);
        favoritesStorage.save(newFavs);
        return newFavs;
      });
    },
    [favoritesStorage],
  );

  const value = useMemo(
    () => ({ favorites, addFavorite, removeFavorite }),
    [favorites, addFavorite, removeFavorite],
  );

  return (
    <FavoritesContext.Provider value={value}>
      {children}
    </FavoritesContext.Provider>
  );
};

export const useFavorites = () => {
  const store = useContext(FavoritesContext);
  return store;
};
