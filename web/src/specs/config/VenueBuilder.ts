import {
	rand,
	randUuid,
	randCompanyName,
	randLatitude,
	randLongitude,
} from "@ngneat/falso"
import { Venue } from "../../domain/Venue"

export const buildVenue = (): Venue => ({
	id: randUuid(),
	category: rand(["public", "official", "business"]),
	name: {
		eu: randCompanyName(),
		es: randCompanyName(),
	},
	location: {
		lat: randLatitude(),
		lng: randLongitude(),
	},
})

export const buildVenues = (amount: number): Venue[] => {
	const venues = []
	for (let index = 0; index < amount; index += 1) {
		venues.push(buildVenue())
	}
	return venues
}
