import type { FutureInstance } from "fluture";
import type { Activity } from "./Activity";
import type { Category } from "./Category";
import type { Venue } from "./Venue";

interface FetchedData {
	readonly activities: readonly Activity[];
	readonly categories: readonly Category[];
	readonly venues: readonly Venue[];
}

export interface Data {
	readonly modified: FetchedData;
	readonly removed: FetchedData;
}

export abstract class DataFetcher {
	public abstract fetch(): FutureInstance<Error, Data>;
	public abstract clear(): void;
}
