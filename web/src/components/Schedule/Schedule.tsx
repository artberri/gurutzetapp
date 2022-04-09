import { useTranslation } from "react-i18next";
import { Day } from "../Day/Day";
import { StackedList } from "../StackedList/StackedList";

const items = [
  <Day key="day6" date={new Date(2022, 4, 6)} />,
  <Day key="day7" date={new Date(2022, 4, 7)} />,
  <Day key="day8" date={new Date(2022, 4, 8)} />,
  <Day key="day13" date={new Date(2022, 4, 13)} />,
  <Day key="day14" date={new Date(2022, 4, 14)} />,
  <Day key="day15" date={new Date(2022, 4, 15)} />,
];

export const Schedule = () => {
  const { t } = useTranslation();

  return (
    <div className="w-full h-full px-3 py-8 flex flex-col">
      <StackedList title={t("title")} items={items} />
    </div>
  );
};
