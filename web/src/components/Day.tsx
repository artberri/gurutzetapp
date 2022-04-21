import { ChevronRightIcon } from "@heroicons/react/outline";
import { KeyboardEventHandler, MouseEventHandler } from "react";
import { useTranslation } from "react-i18next";
import { monthDay, weekDay } from "../utils/DateUtils";

export interface DayProperties {
  date: Date;
  onClick: () => void;
}

export const Day = ({ date, onClick }: DayProperties) => {
  const { i18n } = useTranslation();
  const translateMonthDay = monthDay(i18n.resolvedLanguage);
  const translateWeekDay = weekDay(i18n.resolvedLanguage);
  const handleClick: MouseEventHandler<HTMLDivElement> = (event) => {
    event.preventDefault();
    event.stopPropagation();
    onClick();
  };
  const handleKeyUp: KeyboardEventHandler<HTMLDivElement> = (event) => {
    if (event.key !== "Enter") {
      return;
    }
    event.preventDefault();
    event.stopPropagation();
    onClick();
  };

  return (
    <div
      role="button"
      tabIndex={0}
      onKeyUp={handleKeyUp}
      key={date.toUTCString()}
      onClick={handleClick}
      className="flex p-3 justify-between items-center text-slate-700 cursor-pointer"
    >
      <div>
        <div className="font-medium text-slate-700 first-letter:capitalize">
          {translateMonthDay(date)}
        </div>
        <div className="text-slate-500 first-letter:capitalize">
          {translateWeekDay(date)}
        </div>
      </div>
      <div className="w-5 text-primary">
        <ChevronRightIcon />
      </div>
    </div>
  );
};
