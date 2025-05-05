import type { FutureInstance } from "fluture";
import type { Activity } from "./Activity";
import type { Category } from "./Category";
import type { Venue } from "./Venue";

interface FetchedData {
	readonly activities: ReadonlyArray<Activity>;
	readonly categories: ReadonlyArray<Category>;
	readonly venues: ReadonlyArray<Venue>;
}

export interface Data {
	readonly modified: FetchedData;
	readonly removed: FetchedData;
}

export abstract class DataFetcher {
	public abstract fetch(): FutureInstance<Error, Data>;
	public abstract clear(): void;
}
