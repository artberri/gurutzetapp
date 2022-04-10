import { Either } from "../cross-cutting/Either";

export abstract class ActivityRepository {
  public abstract getActivityDays(): Either<Error, ReadonlyArray<Date>>;
}
