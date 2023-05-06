import { map } from "ramda"
import { useTranslation } from "react-i18next"
import { useActivities } from "../utils/ActivityUtils"
import { Day } from "./Day"
import { FatalErrorDialog } from "./FatalErrorDialog"
import { StackedList } from "./StackedList"

const mapDays = (handleClick: (date: Date) => () => void) =>
	map((date: Date) => (
		<Day
			key={`day-${date.getDate()}-${date.getMonth()}-${date.getFullYear()}`}
			date={date}
			onClick={handleClick(date)}
		/>
	))

export interface DaysProperties {
	onClick: (day: Date) => void
}

export const Days = ({ onClick }: DaysProperties) => {
	const { t } = useTranslation()
	const { getActivityDays } = useActivities()
	const days = getActivityDays()

	const handleDayClick = (date: Date) => () => {
		onClick(date)
	}

	return (
		<>
			<StackedList
				title={t("title") ?? "Gurutzetako Jaiak"}
				items={mapDays(handleDayClick)(days)}
			/>
			<FatalErrorDialog isOpen={days.length === 0} />
		</>
	)
}
