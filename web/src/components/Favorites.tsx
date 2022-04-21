import { useTranslation } from "react-i18next";
import { map } from "ramda";
import { Activity as A } from "../domain/Activity";
import { Favorite } from "./Favorite";
import { StackedList } from "./StackedList";
import { Button } from "./Button";
import { useActivities } from "../utils/ActivityUtils";
import { useFavorites } from "../utils/FavoriteUtils";

const mapFavorites = map((activity: A) => (
  <Favorite key={activity.id} activity={activity} />
));

interface NoResultsProperties {
  onBack: () => void;
}

const NoResults = ({ onBack }: NoResultsProperties) => {
  const { t } = useTranslation();
  return (
    <div className="flex flex-col p-3 justify-between items-start text-slate-700">
      {t("favorites.noresults")}
      <Button className="mt-4 mb-2" onClick={() => onBack()}>
        {t("favorites.back")}
      </Button>
    </div>
  );
};

export interface FavoritesProperties {
  onBack: () => void;
}

export const Favorites = ({ onBack }: FavoritesProperties) => {
  const { t } = useTranslation();
  const { getActivitiesByIds } = useActivities();
  const { favorites } = useFavorites();
  const activities = getActivitiesByIds(favorites);

  return (
    <div className="w-full h-full px-3 flex flex-col">
      <div className=" py-8">
        <StackedList
          title={t("favorites")}
          items={
            activities.length === 0
              ? [<NoResults key="noresults" onBack={onBack} />]
              : mapFavorites(activities)
          }
        />
      </div>
    </div>
  );
};
