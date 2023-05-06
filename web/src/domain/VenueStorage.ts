import { pipe, map } from "ramda"
import { option } from "../cross-cutting/Either"
import { Venue } from "./Venue"
import { Storage } from "./Storage"

const venueStorageKey = "GURUTZETAPP_VENUES"

export class VenueStorage {
	public constructor(private readonly storage: Storage) {}

	public get() {
		const venues = this.storage.getItem<Venue[]>(venueStorageKey)
		return option<Venue[]>(() => [])(venues)
	}

	public save(venues: readonly Venue[]) {
		const newVenueIds = map((a: Venue) => a.id)(venues)
		const updateVenues = pipe(
			(previous: readonly Venue[]) =>
				previous.filter((a) => !newVenueIds.includes(a.id)),
			(previous: readonly Venue[]) => [...previous, ...venues]
		)

		const toSave = updateVenues(this.get())
		this.storage.setItem(venueStorageKey, toSave)
	}

	public remove(venues: readonly Venue[]) {
		const toRemoveVenueIds = map((a: Venue) => a.id)(venues)
		const removeVenues = (previous: readonly Venue[]) =>
			previous.filter((a) => !toRemoveVenueIds.includes(a.id))
		const toSave = removeVenues(this.get())
		this.storage.setItem(venueStorageKey, toSave)
	}

	public clear() {
		this.storage.removeItem(venueStorageKey)
	}
}
