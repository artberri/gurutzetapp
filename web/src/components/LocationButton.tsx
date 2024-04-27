import { MapPinIcon } from "@heroicons/react/24/outline"
import { KeyboardEventHandler } from "react"
import { useTranslation } from "react-i18next"
import { Venue } from "../domain/Venue"
import { useAppState } from "../utils/AppStateUtils"

export interface LocationButtonProperties {
	venue: Venue
}

export const LocationButton = ({ venue }: LocationButtonProperties) => {
	const { t } = useTranslation()
	const { zoomMapTo } = useAppState()

	const goToVenue = () => {
		zoomMapTo([venue.location.lat, venue.location.lng])
	}

	const handleGoToVenueClick = () => {
		goToVenue()
	}

	const handleGoToVenueKeyUp: KeyboardEventHandler<HTMLDivElement> = (
		event,
	) => {
		if (event.key !== "Enter") {
			return
		}
		goToVenue()
	}

	return (
		<div
			aria-label={t("map.goto") ?? "Ver en el mapa"}
			role="button"
			tabIndex={0}
			className="w-8 text-slate-300 cursor-pointer"
			onKeyUp={handleGoToVenueKeyUp}
			onClick={handleGoToVenueClick}
		>
			<MapPinIcon />
		</div>
	)
}
