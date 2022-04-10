import "reflect-metadata";
import { pipe, map, sort, uniq } from "ramda";
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
    const activities = this.storage.getItem<Activity[]>(activityStorageKey);

    return mapE(getUniqueSortedDates)(activities);
  }
}
