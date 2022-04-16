import { useTranslation } from "react-i18next";
import { fold } from "../cross-cutting/Either";
import { Activity as A } from "../domain/Activity";
import { Category } from "../domain/Category";
import { CategoryRepository } from "../domain/CategoryRepository";
import { LocalizedText } from "../domain/LocalizedText";
import { Tracer } from "../domain/Tracer";
import { getHHmm } from "../utils/Date";
import { useService } from "../utils/Services";
import { FavoriteButton } from "./FavoriteButton";

export interface ActivityProperties {
  activity: A;
}

export const Activity = ({ activity }: ActivityProperties) => {
  const { i18n } = useTranslation();
  const categoryRepository = useService(CategoryRepository);
  const tracer = useService(Tracer);
  const category = categoryRepository.getCategory(activity.categoryId);
  const language = i18n.language as keyof LocalizedText;

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
      <div className="w-10 flex-none pl-2">
        <FavoriteButton activity={activity} />
      </div>
    </div>
  );
};
