import { map } from "ramda";
import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { fold } from "../../cross-cutting/Either";
import { ActivityRepository } from "../../domain/ActivityRepository";
import { Tracer } from "../../domain/Tracer";
import { useService } from "../../utils/Services";
import { Day } from "../Day/Day";
import { FatalErrorDialog } from "../FatalErrorDialog/FatalErrorDialog";
import { StackedList } from "../StackedList/StackedList";

const mapDays = map((date: Date) => (
  <Day
    key={`day-${date.getDate()}-${date.getMonth()}-${date.getFullYear()}`}
    date={date}
  />
));

export const Schedule = () => {
  const { t } = useTranslation();
  const activityRepository = useService(ActivityRepository);
  const tracer = useService(Tracer);
  const [days, setDays] = useState<readonly Date[]>([]);
  const [hasError, setHasError] = useState(false);

  useEffect(() => {
    const dates = activityRepository.getActivityDays();
    fold(
      (error) => {
        setHasError(true);
        tracer.trace(error);
      },
      (dayDates: readonly Date[]) => setDays(dayDates)
    )(dates);
  }, [activityRepository, tracer]);

  return (
    <div className="w-full h-full px-3 flex flex-col">
      <div className=" py-8">
        <StackedList title={t("title")} items={mapDays(days)} />
        <FatalErrorDialog isOpen={hasError} onButtonClick={() => {}} />
      </div>
    </div>
  );
};
