import { pipe, map, evolve } from "ramda"
import { option } from "../cross-cutting/Either"
import { just, nothing } from "../cross-cutting/Maybe"
import { Activity } from "./Activity"
import { Storage } from "./Storage"

const activityStorageKey = "GURUTZETAPP_ACTIVITIES_2023"

const fixActivityData = (activity: Activity) =>
	evolve({
		date: (date: Date) => new Date(date),
		dateEnd: (date?: Date) => (date ? new Date(date) : undefined),
		venueId: (venueId?: unknown) => {
			const id = venueId as { data?: { value: string } } | undefined
			return id?.data?.value ? just(id.data.value) : nothing<string>()
		},
	})(activity) as Activity

export class ActivityStorage {
	public constructor(private readonly storage: Storage) {}

	public get() {
		const activities = this.storage.getItem<Activity[]>(activityStorageKey)
		return pipe(
			option<Activity[]>(() => []),
			map(fixActivityData)
		)(activities)
	}

	public save(activities: readonly Activity[]) {
		const newActivityIds = map((a: Activity) => a.id)(activities)
		const updateActivities = pipe(
			(previous: readonly Activity[]) =>
				previous.filter((a) => !newActivityIds.includes(a.id)),
			(previous: readonly Activity[]) => [...previous, ...activities]
		)

		const toSave = updateActivities(this.get())
		this.storage.setItem(activityStorageKey, toSave)
	}

	public remove(activities: readonly Activity[]) {
		const toRemoveActivityIds = map((a: Activity) => a.id)(activities)
		const removeActivities = (previous: readonly Activity[]) =>
			previous.filter((a) => !toRemoveActivityIds.includes(a.id))
		const toSave = removeActivities(this.get())
		this.storage.setItem(activityStorageKey, toSave)
	}

	public clear() {
		this.storage.removeItem(activityStorageKey)
	}
}
