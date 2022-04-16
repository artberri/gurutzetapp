import { useState } from "react";
import { just, nothing, fold } from "../cross-cutting/Maybe";
import { Tracer } from "../domain/Tracer";
import { useService } from "../utils/Services";
import { Activities } from "./Activities";
import { Days } from "./Days";
import { FatalErrorDialog } from "./FatalErrorDialog";

export const Schedule = () => {
  const tracer = useService(Tracer);
  const [hasError, setHasError] = useState(false);
  const [selectedDate, selectDate] = useState(nothing<Date>());

  const handleDayClick = (date: Date) => {
    selectDate(just(date));
  };

  const handleError = (error: Error) => {
    selectDate(nothing());
    setHasError(true);
    tracer.trace(error);
  };

  const handleBack = () => {
    selectDate(nothing());
  };

  return (
    <div className="w-full h-full px-3 flex flex-col">
      <div className=" py-8">
        {fold(
          () => <Days onClick={handleDayClick} onError={handleError} />,
          (date: Date) => (
            <Activities date={date} onBack={handleBack} onError={handleError} />
          ),
        )(selectedDate)}

        <FatalErrorDialog isOpen={hasError} onButtonClick={() => {}} />
      </div>
    </div>
  );
};
