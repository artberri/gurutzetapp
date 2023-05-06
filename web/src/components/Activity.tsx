import { useTranslation } from "react-i18next"
import { left, fold as foldE } from "../cross-cutting/Either"
import { fold } from "../cross-cutting/Maybe"
import { Activity as A } from "../domain/Activity"
import { Category } from "../domain/Category"
import { LocalizedText } from "../domain/LocalizedText"
import { Tracer } from "../domain/Tracer"
import { Venue } from "../domain/Venue"
import { useCategories } from "../utils/CategoryUtils"
import { getHHmm } from "../utils/DateUtils"
import { useService } from "../utils/ServiceUtils"
import { useVenues } from "../utils/VenueUtils"
import { FavoriteButton } from "./FavoriteButton"
import { LocationButton } from "./LocationButton"

export interface ActivityProperties {
	activity: A
}

export const Activity = ({ activity }: ActivityProperties) => {
	const { i18n } = useTranslation()
	const { getCategory } = useCategories()
	const { getVenue } = useVenues()
	const tracer = useService(Tracer)
	const category = getCategory(activity.categoryId)
	const language = i18n.resolvedLanguage as keyof LocalizedText
	const venue = fold(
		() => left<Venue>(new Error("Activity withou venue")),
		getVenue
	)(activity.venueId)

	return (
		<div className="flex p-3 justify-between items-stretch text-slate-700 min-h-[100px]">
			<div className="w-14 flex-none flex flex-col justify-start text-center pr-2">
				<span>{getHHmm(activity.date)}</span>
				{activity.dateEnd && (
					<>
						<span className="block bg-slate-400 w-2 h-[1px] mx-auto" />
						<span>{getHHmm(activity.dateEnd || new Date())}</span>
					</>
				)}
			</div>
			<div className="flex-grow">
				<div className="font-medium text-slate-700 first-letter:capitalize">
					{activity.description[language]}
				</div>
				{foldE(
					(error: Error) => {
						tracer.trace(error)
						return null
					},
					(c: Category) => (
						<div className="text-slate-500 first-letter:capitalize">
							{c.name[language]}
						</div>
					)
				)(category)}
			</div>
			<div className="w-10 flex-none pl-2 flex flex-col justify-between">
				<FavoriteButton activity={activity} />
				{foldE(
					() => null,
					(v: Venue) => <LocationButton venue={v} />
				)(venue)}
			</div>
		</div>
	)
}
