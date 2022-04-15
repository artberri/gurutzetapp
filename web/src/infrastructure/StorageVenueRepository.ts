import { pipe, map, filter, concat } from "ramda";
import { chain, option, right, left } from "../cross-cutting/Either";
import { Venue } from "../domain/Venue";
import { VenueRepository } from "../domain/VenueRepository";
import { Storage } from "./Storage";
import { just, nothing, fold } from "../cross-cutting/Maybe";

const venueStorageKey = "GURUTZETAPP_VENUES";

export class StorageVenueRepository implements VenueRepository {
  private venues = nothing<Venue[]>();

  public constructor(private readonly storage: Storage) {}

  public getVenues() {
    return this.getCachedVenues();
  }

  public getVenue(id: string) {
    return chain((venues: Venue[]) => {
      const venue = venues.find((c) => c.id === id);
      return venue ? right(venue) : left<Venue>(new Error("Venue not found"));
    })(this.getCachedVenues());
  }

  public save(venues: Venue[]) {
    const newVenueIds = map((a: Venue) => a.id)(venues);
    const updateVenues = pipe(
      option<Venue[]>(() => []),
      filter<Venue>((a) => !newVenueIds.includes(a.id)),
      concat<Venue[]>(venues)
    );

    const toSave = updateVenues(this.getCachedVenues());
    this.venues = just(toSave);
    this.storage.setItem(venueStorageKey, toSave);
  }

  public remove(venues: Venue[]) {
    const toRemoveVenueIds = map((a: Venue) => a.id)(venues);
    const removeVenues = pipe(
      option<Venue[]>(() => []),
      filter<Venue>((a) => !toRemoveVenueIds.includes(a.id))
    );
    const toSave = removeVenues(this.getCachedVenues());
    this.venues = just(toSave);
    this.storage.setItem(venueStorageKey, toSave);
  }

  private getCachedVenues() {
    return fold(
      () => this.storage.getItem<Venue[]>(venueStorageKey),
      (venues: Venue[]) => right(venues)
    )(this.venues);
  }
}
