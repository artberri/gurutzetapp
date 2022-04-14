import "reflect-metadata";
import { pipe, map, sort, uniq, evolve, filter } from "ramda";
import { Either, map as mapE } from "../cross-cutting/Either";
import { Activity } from "../domain/Activity";
import { ActivityRepository } from "../domain/ActivityRepository";
import { Storage } from "./Storage";
import { getYYYYMMDD } from "../utils/Date";

const activityStorageKey = "GURUTZETAPP_ACTIVITIES";

const getSortedDayActivities = (date: Date) =>
  pipe(
    filter((a: Activity) => getYYYYMMDD(a.date) === getYYYYMMDD(date)),
    sort((a, b) => a.date.getTime() - b.date.getTime())
  );

const getUniqueSortedDates = pipe(
  map((a: Activity) => getYYYYMMDD(a.date)),
  uniq,
  map((dateString) => new Date(dateString)),
  sort((a, b) => a.getTime() - b.getTime())
);

export class StorageActivityRepository implements ActivityRepository {
  public constructor(private readonly storage: Storage) {}

  public getActivities(date: Date): Either<Error, readonly Activity[]> {
    const activities = this.getActivitiesWithDate();

    return mapE(getSortedDayActivities(date))(activities);
  }

  public getActivityDays() {
    const activities = this.getActivitiesWithDate();

    return mapE(getUniqueSortedDates)(activities);
  }

  public save(activities: readonly Activity[]) {
    this.storage.setItem(activityStorageKey, activities);
  }

  private getActivitiesWithDate() {
    const activities = this.storage.getItem<Activity[]>(activityStorageKey);
    // date fields are serialized to string, so we need to convert it back to Date
    return mapE(
      map(
        evolve({
          date: (date: Date) => new Date(date),
          dateEnd: (date?: Date) => (date ? new Date(date) : undefined),
        })
      )
    )(activities);
  }
}
