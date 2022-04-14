import { useTranslation } from "react-i18next";
import { map } from "ramda";
import { useState, useEffect } from "react";
import { Day } from "./Day";
import { StackedList } from "./StackedList";
import { useService } from "../utils/Services";
import { ActivityRepository } from "../domain/ActivityRepository";
import { fold } from "../cross-cutting/Either";

const mapDays = (handleClick: (date: Date) => () => void) =>
  map((date: Date) => (
    <Day
      key={`day-${date.getDate()}-${date.getMonth()}-${date.getFullYear()}`}
      date={date}
      onClick={handleClick(date)}
    />
  ));

export interface DaysProperties {
  onError: (error: Error) => void;
  onClick: (day: Date) => void;
}

export const Days = ({ onError, onClick }: DaysProperties) => {
  const { t } = useTranslation();
  const activityRepository = useService(ActivityRepository);
  const [days, setDays] = useState<readonly Date[]>([]);

  const handleDayClick = (date: Date) => () => {
    onClick(date);
  };

  useEffect(() => {
    fold((error) => {
      onError(error);
    }, setDays)(activityRepository.getActivityDays());
  }, [activityRepository, onError]);

  return (
    <StackedList title={t("title")} items={mapDays(handleDayClick)(days)} />
  );
};
