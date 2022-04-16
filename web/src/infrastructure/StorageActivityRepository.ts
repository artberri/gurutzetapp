import { pipe, map, sort, uniq, evolve, filter, concat } from "ramda";
import { map as mapE, option, right } from "../cross-cutting/Either";
import { Activity } from "../domain/Activity";
import { ActivityRepository } from "../domain/ActivityRepository";
import { Storage } from "../domain/Storage";
import { getYYYYMMDD } from "../utils/Date";
import { just, nothing, fold } from "../cross-cutting/Maybe";

const activityStorageKey = "GURUTZETAPP_ACTIVITIES";

const getSortedDayActivities = (date: Date) =>
  pipe(
    filter((a: Activity) => getYYYYMMDD(a.date) === getYYYYMMDD(date)),
    sort((a, b) => a.date.getTime() - b.date.getTime()),
  );

const getUniqueSortedDates = pipe(
  map((a: Activity) => getYYYYMMDD(a.date)),
  uniq,
  map((dateString) => new Date(dateString)),
  sort((a, b) => a.getTime() - b.getTime()),
);

export class StorageActivityRepository implements ActivityRepository {
  private activities = nothing<Activity[]>();

  public constructor(private readonly storage: Storage) {}

  public getActivities(date: Date) {
    const activities = this.getActivitiesWithDate();

    return mapE(getSortedDayActivities(date))(activities);
  }

  public getActivityDays() {
    const activities = this.getActivitiesWithDate();

    return mapE(getUniqueSortedDates)(activities);
  }

  public save(activities: Activity[]) {
    const newActivityIds = map((a: Activity) => a.id)(activities);
    const updateActivities = pipe(
      option<Activity[]>(() => []),
      filter<Activity>((a) => !newActivityIds.includes(a.id)),
      concat(activities),
    );

    const toSave = updateActivities(this.getActivitiesWithDate());
    this.activities = just(toSave);
    this.storage.setItem(activityStorageKey, toSave);
  }

  public remove(activities: Activity[]) {
    const toRemoveActivityIds = map((a: Activity) => a.id)(activities);
    const removeActivities = pipe(
      option<Activity[]>(() => []),
      filter<Activity>((a) => !toRemoveActivityIds.includes(a.id)),
    );
    const toSave = removeActivities(this.getActivitiesWithDate());
    this.activities = just(toSave);
    this.storage.setItem(activityStorageKey, toSave);
  }

  private getActivitiesWithDate() {
    return fold(
      () => {
        const activities = this.storage.getItem<Activity[]>(activityStorageKey);
        // date fields are serialized to string, so we need to convert it back to Date
        return mapE(
          map(
            evolve({
              date: (date: Date) => new Date(date),
              dateEnd: (date?: Date) => (date ? new Date(date) : undefined),
            }),
          ),
        )(activities);
      },
      (activities: Activity[]) => right(activities),
    )(this.activities);
  }
}
