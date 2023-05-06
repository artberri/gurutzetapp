import { HeartIcon } from "@heroicons/react/outline"
import { HeartIcon as SolidHeartIcon } from "@heroicons/react/solid"
import { KeyboardEventHandler } from "react"
import { Activity } from "../domain/Activity"
import { useFavorites } from "../utils/FavoriteUtils"

export interface FavoriteButtonProperties {
	activity: Activity
}

export const FavoriteButton = ({ activity }: FavoriteButtonProperties) => {
	const { id } = activity
	const { isFavorite, addFavorite, removeFavorite } = useFavorites()
	const favorite = isFavorite(id)

	const handleAddFavoriteClick = () => {
		addFavorite(id)
	}

	const handleAddFavoriteKeyUp: KeyboardEventHandler<HTMLDivElement> = (
		event
	) => {
		if (event.key !== "Enter") {
			return
		}
		addFavorite(id)
	}

	const handleRemoveFavoriteClick = () => {
		removeFavorite(id)
	}

	const handleRemoveFavoriteKeyUp: KeyboardEventHandler<HTMLDivElement> = (
		event
	) => {
		if (event.key !== "Enter") {
			return
		}
		removeFavorite(id)
	}

	return favorite ? (
		<div
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
			role="button"
			tabIndex={0}
			className="text-primary cursor-pointer"
			onKeyUp={handleAddFavoriteKeyUp}
			onClick={handleAddFavoriteClick}
		>
			<HeartIcon />
		</div>
	)
}
