import { useTranslation } from "react-i18next";
import { TrashIcon } from "@heroicons/react/outline";
import { KeyboardEventHandler } from "react";
import { fold, left } from "../cross-cutting/Either";
import { fold as foldM } from "../cross-cutting/Maybe";
import { Activity as A } from "../domain/Activity";
import { Category } from "../domain/Category";
import { LocalizedText } from "../domain/LocalizedText";
import { Tracer } from "../domain/Tracer";
import { useCategories } from "../utils/CategoryUtils";
import { getHHmm, monthDay, weekDay } from "../utils/DateUtils";
import { useService } from "../utils/ServiceUtils";
import { useFavorites } from "../utils/FavoriteUtils";
import { Venue } from "../domain/Venue";
import { LocationButton } from "./LocationButton";
import { useVenues } from "../utils/VenueUtils";

export interface FavoriteProperties {
  activity: A;
}

export const Favorite = ({ activity }: FavoriteProperties) => {
  const { id, date, dateEnd, description, categoryId, venueId } = activity;
  const { i18n } = useTranslation();
  const { getCategory } = useCategories();
  const { removeFavorite } = useFavorites();
  const { getVenue } = useVenues();
  const translateMonthDay = monthDay(i18n.resolvedLanguage);
  const translateWeekDay = weekDay(i18n.resolvedLanguage);
  const tracer = useService(Tracer);
  const category = getCategory(categoryId);
  const language = i18n.resolvedLanguage as keyof LocalizedText;
  const venue = foldM(
    () => left<Venue>(new Error("Activity withou venue")),
    getVenue,
  )(venueId);

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
    <div className="flex p-3 justify-between items-stretch text-slate-700 min-h-[100px]">
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
      <div className="w-10 flex-none pl-2 flex h-100 flex-col justify-between">
        <div
          role="button"
          tabIndex={0}
          className="text-slate-500 cursor-pointer"
          onKeyUp={handleRemoveFavoriteKeyUp}
          onClick={handleRemoveFavoriteClick}
        >
          <TrashIcon />
        </div>
        {fold(
          // eslint-disable-next-line unicorn/no-null
          () => null,
          (v: Venue) => <LocationButton venue={v} />,
        )(venue)}
      </div>
    </div>
  );
};
