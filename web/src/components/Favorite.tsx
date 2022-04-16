import { useTranslation } from "react-i18next";
import { TrashIcon } from "@heroicons/react/outline";
import { KeyboardEventHandler } from "react";
import { fold } from "../cross-cutting/Either";
import { Activity as A } from "../domain/Activity";
import { Category } from "../domain/Category";
import { LocalizedText } from "../domain/LocalizedText";
import { Tracer } from "../domain/Tracer";
import { useCategories } from "../utils/CategoryUtils";
import { getHHmm, monthDay, weekDay } from "../utils/DateUtils";
import { useService } from "../utils/ServiceUtils";
import { useFavorites } from "../utils/FavoriteUtils";

export interface FavoriteProperties {
  activity: A;
}

export const Favorite = ({ activity }: FavoriteProperties) => {
  const { id, date, dateEnd, description, categoryId } = activity;
  const { i18n } = useTranslation();
  const { getCategory } = useCategories();
  const { removeFavorite } = useFavorites();
  const translateMonthDay = monthDay(i18n.language);
  const translateWeekDay = weekDay(i18n.language);
  const tracer = useService(Tracer);
  const category = getCategory(categoryId);
  const language = i18n.language as keyof LocalizedText;

  const handleRemoveFavoriteClick = () => {
    removeFavorite(id);
  };

  const handleRemoveFavoriteKeyUp: KeyboardEventHandler<HTMLDivElement> = (
    event,
  ) => {
    if (event.key !== "Enter") {
      return;
    }
    removeFavorite(id);
  };

  return (
    <div className="flex p-3 justify-between items-start text-slate-700">
      <div className="flex-grow">
        <div className="text-xs">
          <span>{translateMonthDay(date)}, </span>
          <span>{translateWeekDay(date)} / </span>
          <span>{getHHmm(date)}</span>
          {dateEnd && (
            <>
              <span> - </span>
              <span>{getHHmm(dateEnd || new Date())}</span>
            </>
          )}
        </div>
        <div className="font-medium text-slate-700 first-letter:capitalize">
          {description[language]}
        </div>
        {fold(
          (error: Error) => {
            tracer.trace(error);
            // eslint-disable-next-line unicorn/no-null
            return null;
          },
          (c: Category) => (
            <div className="text-slate-500 first-letter:capitalize">
              {c.name[language]}
            </div>
          ),
        )(category)}
      </div>
      <div className="w-8 flex-none pl-2">
        <div
          role="button"
          tabIndex={0}
          className="text-slate-500 cursor-pointer"
          onKeyUp={handleRemoveFavoriteKeyUp}
          onClick={handleRemoveFavoriteClick}
        >
          <TrashIcon />
        </div>
      </div>
    </div>
  );
};
