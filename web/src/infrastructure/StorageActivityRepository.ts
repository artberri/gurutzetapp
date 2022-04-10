import "reflect-metadata";
import { pipe, map, sort, uniq, evolve } from "ramda";
import { map as mapE } from "../cross-cutting/Either";
import { Activity } from "../domain/Activity";
import { ActivityRepository } from "../domain/ActivityRepository";
import { Storage } from "./Storage";

const activityStorageKey = "GURUTZETAPP_ACTIVITIES";

const getUniqueSortedDates = pipe(
  map((a: Activity) => a.date.toISOString().slice(0, 10)),
  uniq,
  map((dateString) => new Date(dateString)),
  sort((a, b) => a.getTime() - b.getTime())
);

export class StorageActivityRepository implements ActivityRepository {
  public constructor(private readonly storage: Storage) {}

  public getActivityDays() {
    const activities = this.getActivitiesWithDate();

    return mapE(getUniqueSortedDates)(activities);
  }

  public save(activities: readonly Activity[]) {
    this.storage.setItem(activityStorageKey, activities);
  }

  private getActivitiesWithDate() {
    const activities = this.storage.getItem<Activity[]>(activityStorageKey);
    // date field is serialized to string, so we need to convert it back to Date
    return mapE(map(evolve({ date: (date: Date) => new Date(date) })))(
      activities
    );
  }
}
