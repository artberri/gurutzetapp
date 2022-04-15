import { Either } from "../cross-cutting/Either";
import { Activity } from "./Activity";

export abstract class ActivityRepository {
  public abstract getActivityDays(): Either<Error, ReadonlyArray<Date>>;
  public abstract getActivities(
    date: Date
  ): Either<Error, ReadonlyArray<Activity>>;
  public abstract save(activities: readonly Activity[]): void;
  public abstract remove(activities: readonly Activity[]): void;
}
