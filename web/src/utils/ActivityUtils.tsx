import { filter, map, pipe, sort, uniq } from "ramda";
import {
  createContext,
  ReactNode,
  useCallback,
  useContext,
  useMemo,
  useState,
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

const getUniqueSortedDates = pipe(
  map((a: Activity) => getYYYYMMDD(a.date)),
  uniq,
  map((dateString) => new Date(dateString)),
  sort((a, b) => a.getTime() - b.getTime()),
);

export const ActivityContext = createContext<{
  getActivityDays: () => Date[];
  getActivities: (date: Date) => Activity[];
}>({
  getActivityDays: () => [],
  getActivities: () => [],
});

export const ActivityProvider = ({ children }: { children: ReactNode }) => {
  const storage = useService(ActivityStorage);
  const [activities] = useState<Activity[]>(() => storage.get());

  const getActivityDays = useCallback(
    () => getUniqueSortedDates(activities),
    [activities],
  );

  const getActivities = useCallback(
    (date: Date) => getSortedDayActivities(date)(activities),
    [activities],
  );

  const value = useMemo(
    () => ({ getActivityDays, getActivities }),
    [getActivityDays, getActivities],
  );

  return (
    <ActivityContext.Provider value={value}>
      {children}
    </ActivityContext.Provider>
  );
};

export const useActivities = () => useContext(ActivityContext);
