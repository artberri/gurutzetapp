import { map } from "fluture";
import type { ActivityStorage } from "./ActivityStorage";
import type { CategoryStorage } from "./CategoryStorage";
import type { Data, DataFetcher } from "./DataFetcher";
import type { VenueStorage } from "./VenueStorage";

const sync =
	({
		activityStorage,
		categoryStorage,
		venueStorage,
	}: {
		activityStorage: ActivityStorage;
		categoryStorage: CategoryStorage;
		venueStorage: VenueStorage;
	}) =>
	(data: Data) => {
		const { modified, removed } = data;
		const { activities, categories, venues } = modified;
		const {
			activities: removedActivities,
			categories: removedCategories,
			venues: removedVenues,
		} = removed;

		activityStorage.remove(removedActivities);
		activityStorage.save(activities);
		categoryStorage.remove(removedCategories);
		categoryStorage.save(categories);
		venueStorage.remove(removedVenues);
		venueStorage.save(venues);
	};

export class Syncronizer {
	private readonly fetcher: DataFetcher;
	private readonly activityStorage: ActivityStorage;
	private readonly categoryStorage: CategoryStorage;
	private readonly venueStorage: VenueStorage;

	public constructor(
		fetcher: DataFetcher,
		activityStorage: ActivityStorage,
		categoryStorage: CategoryStorage,
		venueStorage: VenueStorage,
	) {
		this.fetcher = fetcher;
		this.activityStorage = activityStorage;
		this.categoryStorage = categoryStorage;
		this.venueStorage = venueStorage;
	}

	public sync() {
		return map(
			sync({
				activityStorage: this.activityStorage,
				categoryStorage: this.categoryStorage,
				venueStorage: this.venueStorage,
			}),
		)(this.fetcher.fetch());
	}

	public clear() {
		this.activityStorage.clear();
		this.categoryStorage.clear();
		this.venueStorage.clear();
		this.fetcher.clear();
	}
}
