import { rand, randUuid, random, randNumber, randPhrase } from "@ngneat/falso"
import { just, nothing } from "../../cross-cutting/Maybe"
import { Activity } from "../../domain/Activity"
import { Category } from "../../domain/Category"
import { Venue } from "../../domain/Venue"

export const buildActivity = ({
	day,
	category,
	venue,
}: {
	day: Date
	category: Category
	venue: Venue
}): Activity => {
	const date = new Date(day)
	date.setHours(randNumber({ min: 9, max: 21 }), random() > 0.3 ? 0 : 30, 0)
	const dateEnd = new Date(date)
	dateEnd.setHours(dateEnd.getHours() + randNumber({ min: 1, max: 3 }))
	return {
		id: randUuid(),
		date,
		dateEnd: random() > 0.8 ? dateEnd : undefined,
		description: {
			eu: `${randPhrase()} Eu`,
			es: `${randPhrase()} Es`,
		},
		categoryId: category.id,
		venueId: random() > 0.1 ? just(venue.id) : nothing<string>(),
	}
}

export const buildActivities = ({
	amount,
	days,
	venues,
	categories,
}: {
	amount: number
	days: Date[]
	venues: Venue[]
	categories: Category[]
}): Activity[] => {
	const activities = []
	for (let index = 0; index < amount; index += 1) {
		activities.push(
			buildActivity({
				day: rand(days),
				category: rand(categories),
				venue: rand(venues),
			})
		)
	}
	return activities
}
