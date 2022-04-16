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
import { useService } from "./ServiceUtils";

const FavoritesContext = createContext<{
  favorites: string[];
  addFavorite: (activityId: string) => void;
  removeFavorite: (activityId: string) => void;
  isFavorite: (activityId: string) => boolean;
}>({
  favorites: [],
  addFavorite: noop,
  removeFavorite: noop,
  isFavorite: () => false,
});

export const FavoritesProvider = ({ children }: { children: ReactNode }) => {
  const favoritesStorage = useService(FavoriteStorage);
  const [favorites, setFavorites] = useState<string[]>(() =>
    favoritesStorage.getFavorites(),
  );

  const addFavorite = useCallback(
    (activityId: string) => {
      setFavorites((favs) => {
        const newFavs = uniq([...favs, activityId]);
        favoritesStorage.save(newFavs);
        return newFavs;
      });
    },
    [favoritesStorage],
  );

  const removeFavorite = useCallback(
    (activityId: string) => {
      setFavorites((favs) => {
        const newFavs = filter((s: string) => s !== activityId)(favs);
        favoritesStorage.save(newFavs);
        return newFavs;
      });
    },
    [favoritesStorage],
  );

  const isFavorite = useCallback(
    (activityId: string) => favorites.includes(activityId),
    [favorites],
  );

  const value = useMemo(
    () => ({ favorites, addFavorite, removeFavorite, isFavorite }),
    [favorites, addFavorite, removeFavorite, isFavorite],
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
