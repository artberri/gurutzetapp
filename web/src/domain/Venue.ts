import { LocalizedText } from "./LocalizedText"

export type VenueCategory = "public" | "official" | "business"

export interface Venue {
	readonly id: string
	readonly name: LocalizedText
	readonly category: VenueCategory
	readonly location: {
		lat: number
		lng: number
	}
}
