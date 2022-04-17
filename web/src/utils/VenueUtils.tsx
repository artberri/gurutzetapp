import {
  createContext,
  ReactNode,
  useCallback,
  useContext,
  useMemo,
  useState,
} from "react";
import { Either, left, right } from "../cross-cutting/Either";
import { Venue } from "../domain/Venue";
import { VenueStorage } from "../domain/VenueStorage";
import { useService } from "./ServiceUtils";

export const VenueContext = createContext<{
  getVenue: (id: string) => Either<Error, Venue>;
  venues: readonly Venue[];
}>({
  venues: [],
  getVenue: () => left<Venue>(new Error("Context not initialized")),
});

export const VenueProvider = ({ children }: { children: ReactNode }) => {
  const storage = useService(VenueStorage);
  const [venues] = useState<Venue[]>(() => storage.get());

  const getVenue = useCallback(
    (id: string) => {
      const venue = venues.find((c) => c.id === id);
      return venue ? right(venue) : left<Venue>(new Error("Venue not found"));
    },
    [venues],
  );

  const value = useMemo(() => ({ getVenue, venues }), [getVenue, venues]);

  return (
    <VenueContext.Provider value={value}>{children}</VenueContext.Provider>
  );
};

export const useVenues = () => useContext(VenueContext);
