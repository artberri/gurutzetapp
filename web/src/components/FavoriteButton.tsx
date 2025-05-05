import { HeartIcon } from "@heroicons/react/24/outline";
import { HeartIcon as SolidHeartIcon } from "@heroicons/react/24/solid";
import type { KeyboardEventHandler } from "react";
import { useTranslation } from "react-i18next";
import type { Activity } from "../domain/Activity";
import { useFavorites } from "../utils/FavoriteUtils";

export interface FavoriteButtonProperties {
	activity: Activity;
}

export const FavoriteButton = ({ activity }: FavoriteButtonProperties) => {
	const { id } = activity;
	const { t } = useTranslation();
	const { isFavorite, addFavorite, removeFavorite } = useFavorites();
	const favorite = isFavorite(id);

	const handleAddFavoriteClick = () => {
		addFavorite(id);
	};

	const handleAddFavoriteKeyUp: KeyboardEventHandler<HTMLDivElement> = (
		event,
	) => {
		if (event.key !== "Enter") {
			return;
		}
		addFavorite(id);
	};

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

	return favorite ? (
		<div
			aria-label={t("back") ?? "Volver"}
			// biome-ignore lint/a11y/useSemanticElements: <explanation>
			role="button"
			tabIndex={0}
			className="text-primary cursor-pointer"
			onKeyUp={handleRemoveFavoriteKeyUp}
			onClick={handleRemoveFavoriteClick}
		>
			<SolidHeartIcon />
		</div>
	) : (
		<div
			aria-label={t("favorites.add") ?? "Añadir favorito"}
			// biome-ignore lint/a11y/useSemanticElements: <explanation>
			role="button"
			tabIndex={0}
			className="text-primary cursor-pointer"
			onKeyUp={handleAddFavoriteKeyUp}
			onClick={handleAddFavoriteClick}
		>
			<HeartIcon />
		</div>
	);
};
