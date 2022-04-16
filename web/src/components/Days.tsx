import { useTranslation } from "react-i18next";
import { map } from "ramda";
import { Day } from "./Day";
import { StackedList } from "./StackedList";
import { useActivities } from "../utils/ActivityUtils";
import { FatalErrorDialog } from "./FatalErrorDialog";

const mapDays = (handleClick: (date: Date) => () => void) =>
  map((date: Date) => (
    <Day
      key={`day-${date.getDate()}-${date.getMonth()}-${date.getFullYear()}`}
      date={date}
      onClick={handleClick(date)}
    />
  ));

export interface DaysProperties {
  onClick: (day: Date) => void;
}

export const Days = ({ onClick }: DaysProperties) => {
  const { t } = useTranslation();
  const { getActivityDays } = useActivities();
  const days = getActivityDays();

  const handleDayClick = (date: Date) => () => {
    onClick(date);
  };

  return (
    <>
      <StackedList title={t("title")} items={mapDays(handleDayClick)(days)} />
      <FatalErrorDialog isOpen={days.length === 0} />
    </>
  );
};
