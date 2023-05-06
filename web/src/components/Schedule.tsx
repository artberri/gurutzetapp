import { fold } from "../cross-cutting/Maybe"
import { useAppState } from "../utils/AppStateUtils"
import { Activities } from "./Activities"
import { Days } from "./Days"

export const Schedule = () => {
	const { date, goBack, goToDay } = useAppState()

	const handleDayClick = (day: Date) => {
		goToDay(day)
	}

	const handleBack = () => {
		goBack()
	}

	return (
		<div className="w-full h-full px-3 flex flex-col">
			<div className=" py-8">
				{fold(
					() => <Days onClick={handleDayClick} />,
					(day: Date) => <Activities date={day} onBack={handleBack} />
				)(date)}
			</div>
		</div>
	)
}
