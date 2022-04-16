import { useTranslation } from "react-i18next";
import { ArrowLeftIcon } from "@heroicons/react/outline";
import { map } from "ramda";
import { MouseEventHandler, KeyboardEventHandler } from "react";
import { Activity as A } from "../domain/Activity";
import { Activity } from "./Activity";
import { monthDay, weekDay } from "../utils/DateUtils";
import { StackedList } from "./StackedList";
import { useActivities } from "../utils/ActivityUtils";

const mapActivities = map((activity: A) => (
  <Activity key={activity.id} activity={activity} />
));

export interface ActivitiesProperties {
  date: Date;
  onBack: () => void;
}

export const Activities = ({ onBack, date }: ActivitiesProperties) => {
  const { i18n } = useTranslation();
  const translateMonthDay = monthDay(i18n.language);
  const translateWeekDay = weekDay(i18n.language);
  const { getActivities } = useActivities();
  const activities = getActivities(date);

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

  return (
    <>
      <div className="flex flex-row justify-between align-center bg-white rounded-xl shadow-lg divide-x mb-6">
        <div
          role="button"
          tabIndex={0}
          onKeyUp={handleBackKeyUp}
          onClick={handleBackClick}
          className="text-primary w-12 p-3 flex justify-center align-center"
        >
          <ArrowLeftIcon />
        </div>
      </div>
      <StackedList
        title={`${translateMonthDay(date)} / ${translateWeekDay(date)}`}
        items={mapActivities(activities)}
      />
    </>
  );
};
