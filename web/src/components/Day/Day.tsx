import { ChevronRightIcon } from "@heroicons/react/outline";
import { useTranslation } from "react-i18next";
import { monthDay, weekDay } from "../../utils/Date";

export interface DayProperties {
  date: Date;
}

export const Day = ({ date }: DayProperties) => {
  const { i18n } = useTranslation();
  const translateMonthDay = monthDay(i18n.language);
  const translateWeekDay = weekDay(i18n.language);
  return (
    <div className="flex p-3 justify-between items-center text-slate-700 cursor-pointer">
      <div>
        <div className="font-medium text-slate-700 first-letter:capitalize">
          {translateMonthDay(date)}
        </div>
        <div className="text-slate-500 first-letter:capitalize">
          {translateWeekDay(date)}
        </div>
      </div>
      <div className="w-5 text-slate-500">
        <ChevronRightIcon />
      </div>
    </div>
  );
};
