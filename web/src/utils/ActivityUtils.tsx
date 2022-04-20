import { filter, map, pipe, sort, uniq } from "ramda";
import {
  createContext,
  ReactNode,
  useCallback,
  useContext,
  useMemo,
} from "react";
import { Activity } from "../domain/Activity";
import { ActivityStorage } from "../domain/ActivityStorage";
import { getYYYYMMDD } from "./DateUtils";
import { useService } from "./ServiceUtils";

const getSortedDayActivities = (date: Date) =>
  pipe(
    filter((a: Activity) => getYYYYMMDD(a.date) === getYYYYMMDD(date)),
    sort((a, b) => a.date.getTime() - b.date.getTime()),
  );

const getSortedByIdsActivities = (ids: string[]) =>
  pipe(
    filter((a: Activity) => ids.includes(a.id)),
    sort((a, b) => a.date.getTime() - b.date.getTime()),
  );

const getUniqueSortedDates = pipe(
  map((a: Activity) => getYYYYMMDD(a.date)),
  uniq,
  map((dateString) => new Date(dateString)),
  sort((a, b) => a.getTime() - b.getTime()),
);

export const ActivityContext = createContext<{
  getActivityDays: () => Date[];
  getActivities: (date: Date) => Activity[];
  getActivitiesByIds: (ids: string[]) => Activity[];
}>({
  getActivityDays: () => [],
  getActivities: () => [],
  getActivitiesByIds: () => [],
});

export const ActivityProvider = ({ children }: { children: ReactNode }) => {
  const storage = useService(ActivityStorage);
  const activities = useMemo<Activity[]>(() => storage.get(), [storage]);

  const getActivityDays = useCallback(
    () => getUniqueSortedDates(activities),
    [activities],
  );

  const getActivities = useCallback(
    (date: Date) => getSortedDayActivities(date)(activities),
    [activities],
  );

  const getActivitiesByIds = useCallback(
    (ids: string[]) => getSortedByIdsActivities(ids)(activities),
    [activities],
  );

  const value = useMemo(
    () => ({ getActivityDays, getActivities, getActivitiesByIds }),
    [getActivityDays, getActivities, getActivitiesByIds],
  );

  return (
    <ActivityContext.Provider value={value}>
      {children}
    </ActivityContext.Provider>
  );
};

export const useActivities = () => useContext(ActivityContext);
