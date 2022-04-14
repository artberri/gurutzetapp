import { HeartIcon } from "@heroicons/react/outline";
import { useTranslation } from "react-i18next";
import { Activity as A } from "../domain/Activity";
import { LocalizedText } from "../domain/LocalizedText";
import { getHHmm } from "../utils/Date";

export interface ActivityProperties {
  activity: A;
}

export const Activity = ({ activity }: ActivityProperties) => {
  const { i18n } = useTranslation();
  const language = i18n.language as keyof LocalizedText;
  console.log(activity);
  return (
    <div className="flex p-3 justify-between items-start text-slate-700">
      <div className="w-14 flex-none flex flex-col text-center pr-2">
        <span>{getHHmm(activity.date)}</span>
        {activity.dateEnd && (
          <>
            <span className="block bg-slate-400 w-2 h-[1px] m-auto" />
            <span>{getHHmm(activity.dateEnd || new Date())}</span>
          </>
        )}
      </div>
      <div className="flex-grow">
        <div className="font-medium text-slate-700 first-letter:capitalize">
          {activity.description[language]}
        </div>
        <div className="text-slate-500 first-letter:capitalize">
          {activity.category.name[language]}
        </div>
      </div>
      <div className="w-10 flex-none text-primary cursor-pointer pl-2">
        <HeartIcon />
      </div>
    </div>
  );
};
