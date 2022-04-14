import { useTranslation } from "react-i18next";
import { ArrowLeftIcon } from "@heroicons/react/outline";
import { map } from "ramda";
import {
  useState,
  useEffect,
  MouseEventHandler,
  KeyboardEventHandler,
} from "react";
import { Activity as A } from "../domain/Activity";
import { Activity } from "./Activity";
import { monthDay, weekDay } from "../utils/Date";
import { StackedList } from "./StackedList";
import { useService } from "../utils/Services";
import { ActivityRepository } from "../domain/ActivityRepository";
import { fold } from "../cross-cutting/Either";

const mapActivities = map((activity: A) => (
  <Activity key={activity.id} activity={activity} />
));

export interface ActivitiesProperties {
  date: Date;
  onBack: () => void;
  onError: (error: Error) => void;
}

export const Activities = ({ onBack, date, onError }: ActivitiesProperties) => {
  const { i18n } = useTranslation();
  const translateMonthDay = monthDay(i18n.language);
  const translateWeekDay = weekDay(i18n.language);
  const activityRepository = useService(ActivityRepository);
  const [activities, setActivities] = useState<readonly A[]>([]);

  useEffect(() => {
    fold((error) => {
      onError(error);
    }, setActivities)(activityRepository.getActivities(date));
  }, [activityRepository, date, onError]);

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
