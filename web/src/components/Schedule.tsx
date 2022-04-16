import { useState } from "react";
import { just, nothing, fold } from "../cross-cutting/Maybe";
import { Activities } from "./Activities";
import { Days } from "./Days";

export const Schedule = () => {
  const [selectedDate, selectDate] = useState(nothing<Date>());

  const handleDayClick = (date: Date) => {
    selectDate(just(date));
  };

  const handleBack = () => {
    selectDate(nothing());
  };

  return (
    <div className="w-full h-full px-3 flex flex-col">
      <div className=" py-8">
        {fold(
          () => <Days onClick={handleDayClick} />,
          (date: Date) => <Activities date={date} onBack={handleBack} />,
        )(selectedDate)}
      </div>
    </div>
  );
};
