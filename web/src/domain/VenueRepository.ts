import { Either } from "../cross-cutting/Either";
import { Venue } from "./Venue";

export abstract class VenueRepository {
  public abstract getVenue(id: string): Either<Error, Venue>;
  public abstract getVenues(): Either<Error, ReadonlyArray<Venue>>;
  public abstract save(activities: readonly Venue[]): void;
  public abstract remove(activities: readonly Venue[]): void;
}
