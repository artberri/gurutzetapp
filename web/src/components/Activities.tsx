import { useTranslation } from "react-i18next";
import { ArrowLeftIcon } from "@heroicons/react/outline";
import { map, pipe, uniq } from "ramda";
import {
  MouseEventHandler,
  KeyboardEventHandler,
  useState,
  useMemo,
} from "react";
import { Activity as A } from "../domain/Activity";
import { Activity } from "./Activity";
import { monthDay, weekDay } from "../utils/DateUtils";
import { StackedList } from "./StackedList";
import { useActivities } from "../utils/ActivityUtils";
import { ActivityFilter } from "./ActivityFilter";
import { fold, Maybe } from "../cross-cutting/Maybe";
import { Category } from "../domain/Category";

const mapActivities = map((activity: A) => (
  <Activity key={activity.id} activity={activity} />
));

export interface ActivitiesProperties {
  date: Date;
  onBack: () => void;
}

export const Activities = ({ onBack, date }: ActivitiesProperties) => {
  const { i18n } = useTranslation();
  const translateMonthDay = monthDay(i18n.resolvedLanguage);
  const translateWeekDay = weekDay(i18n.resolvedLanguage);
  const { getActivities } = useActivities();
  const allDateActivities = useMemo(
    () => getActivities(date),
    [date, getActivities],
  );
  const categoryIds = useMemo(
    () =>
      pipe(
        map((a: A) => a.categoryId),
        uniq,
      )(allDateActivities),
    [allDateActivities],
  );
  const [activities, setActivities] = useState<A[]>(allDateActivities);

  const handleBackClick: MouseEventHandler<HTMLDivElement> = (event) => {
    event.preventDefault();
    event.stopPropagation();
    onBack();
  };
  const handleBackKeyUp: KeyboardEventHandler<HTMLDivElement> = (event) => {
    if (event.key !== "Enter") {
      return;
    }
    event.preventDefault();
    event.stopPropagation();
    onBack();
  };
  const onFilterChange = (category: Maybe<Category>) => {
    fold(
      () => setActivities(allDateActivities),
      (c: Category) => {
        setActivities(allDateActivities.filter((a) => a.categoryId === c.id));
      },
    )(category);
  };

  return (
    <>
      <div className="flex flex-row justify-between align-center  mb-6">
        <div
          role="button"
          tabIndex={0}
          onKeyUp={handleBackKeyUp}
          onClick={handleBackClick}
          className="mr-5 text-primary w-12 px-3 flex justify-center align-center bg-white rounded-xl shadow-lg divide-x"
        >
          <ArrowLeftIcon />
        </div>
        <div className="text-primary w-12 p-2 flex flex-grow justify-center align-center bg-white rounded-xl shadow-lg divide-x">
          <ActivityFilter categoryIds={categoryIds} onChange={onFilterChange} />
        </div>
      </div>
      <StackedList
        title={`${translateMonthDay(date)} / ${translateWeekDay(date)}`}
        items={mapActivities(activities)}
      />
    </>
  );
};
