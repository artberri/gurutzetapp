import {
	type ContentfulClientApi,
	type Entry,
	type SyncCollection,
	createClient,
} from "contentful";
import {
	type FutureInstance,
	attemptP,
	chain,
	map as mapF,
	resolve,
} from "fluture";
import { concat, filter, map, mergeDeepWith, pipe } from "ramda";
import { type Either, fold, option, right } from "../cross-cutting/Either";
import { just, nothing } from "../cross-cutting/Maybe";
import type { Activity } from "../domain/Activity";
import type { Category } from "../domain/Category";
import type { Data, DataFetcher } from "../domain/DataFetcher";
import type { Storage } from "../domain/Storage";
import type { Venue } from "../domain/Venue";
import { parseError } from "../utils/ErrorUtils";
import type {
	ActivityEntrySkeleton,
	CategoryEntrySkeleton,
	DeletedEntry,
	GurutzetaEntrySkeleton,
	VenueEntrySkeleton,
} from "./ContentfulModels";
import { getEnv } from "./GetEnv";

type Client = ContentfulClientApi<undefined>;

const nextTokenKey = "GURUTZETAPP_NEXT_TOKEN_2024";

const mapActivity = (
	entry: Entry<ActivityEntrySkeleton, "WITH_ALL_LOCALES", "es" | "eu">,
): Activity => ({
	id: entry.sys.id,
	date: new Date(entry.fields.date.es ?? new Date("2025-05-17")),
	dateEnd: entry.fields.dateEnd?.es
		? new Date(entry.fields.dateEnd.es)
		: undefined,
	description: {
		es: entry.fields.description.es ?? "N/A",
		eu: entry.fields.description.eu ?? "N/A",
	},
	categoryId: entry.fields.category?.es?.sys.id ?? "N/A",
	venueId: entry.fields.venue?.es?.sys.id
		? just(entry.fields.venue?.es.sys.id)
		: nothing(),
	type: entry.fields.type?.es ?? "normal",
});

const mapRemovedActivity = (entry: DeletedEntry): Activity => ({
	id: entry.sys.id,
	date: new Date(),
	description: {
		es: "",
		eu: "",
	},
	categoryId: "",
	venueId: nothing(),
	type: "normal",
});

const mapCategory = (
	entry: Entry<CategoryEntrySkeleton, "WITH_ALL_LOCALES", "es" | "eu">,
): Category => ({
	id: entry.sys.id,
	label: entry.fields.label.es ?? "N/A",
	name: {
		es: entry.fields.name.es ?? "N/A",
		eu: entry.fields.name.eu ?? "N/A",
	},
});

const mapRemovedCategory = (entry: DeletedEntry): Category => ({
	id: entry.sys.id,
	name: {
		es: "",
		eu: "",
	},
	label: "",
});

const mapVenue = (
	entry: Entry<VenueEntrySkeleton, "WITH_ALL_LOCALES", "es" | "eu">,
): Venue => ({
	id: entry.sys.id,
	name: {
		es: entry.fields.name.es ?? "N/A",
		eu: entry.fields.name.eu ?? "N/A",
	},
	category: entry.fields.category.es ?? "business",
	location: {
		lat: entry.fields.location.es?.lat ?? 0,
		lng: entry.fields.location.es?.lon ?? 0,
	},
});

const mapRemovedVenue = (entry: DeletedEntry): Venue => ({
	id: entry.sys.id,
	name: {
		es: "",
		eu: "",
	},
	category: "official",
	location: {
		lat: 0,
		lng: 0,
	},
});

const isActivity = (
	entry: Entry<GurutzetaEntrySkeleton, "WITH_ALL_LOCALES", "es" | "eu">,
): entry is Entry<ActivityEntrySkeleton, "WITH_ALL_LOCALES", "es" | "eu"> => {
	return (
		entry?.sys?.type === "Entry" &&
		entry?.sys?.contentType?.sys?.id === "activity"
	);
};

const isCategory = (
	entry: Entry<GurutzetaEntrySkeleton, "WITH_ALL_LOCALES", "es" | "eu">,
): entry is Entry<CategoryEntrySkeleton, "WITH_ALL_LOCALES", "es" | "eu"> => {
	return (
		entry?.sys?.type === "Entry" &&
		entry?.sys?.contentType?.sys?.id === "category"
	);
};

const isVenue = (
	entry: Entry<GurutzetaEntrySkeleton, "WITH_ALL_LOCALES", "es" | "eu">,
): entry is Entry<VenueEntrySkeleton, "WITH_ALL_LOCALES", "es" | "eu"> => {
	return (
		entry?.sys?.type === "Entry" && entry?.sys?.contentType?.sys?.id === "venue"
	);
};

const getActivities = pipe(
	(entries: Entry<GurutzetaEntrySkeleton>[]) => filter(isActivity)(entries),
	map(mapActivity),
);

const getCategories = pipe(
	(entries: Entry<GurutzetaEntrySkeleton>[]) => filter(isCategory)(entries),
	map(mapCategory),
);

const getVenues = pipe(
	(entries: Entry<GurutzetaEntrySkeleton>[]) => filter(isVenue)(entries),
	map(mapVenue),
);

const parseData = (response: SyncCollection<GurutzetaEntrySkeleton>): Data => {
	const { entries, deletedEntries } = response;

	return {
		modified: {
			activities: getActivities(entries),
			categories: getCategories(entries),
			venues: getVenues(entries),
		},
		removed: {
			activities: map(mapRemovedActivity)(deletedEntries),
			categories: map(mapRemovedCategory)(deletedEntries),
			venues: map(mapRemovedVenue)(deletedEntries),
		},
	};
};

const fetchInitial = (client: Client) => () =>
	attemptP<Error, { data: Data; token: string | undefined }>(() =>
		client
			.sync<GurutzetaEntrySkeleton>({
				initial: true,
			})
			.then((response) => ({
				data: parseData(response),
				token: response.nextSyncToken,
			}))
			.catch((error) => {
				throw parseError(error);
			}),
	);

const fetchNext = (client: Client) => (token: string | undefined) =>
	attemptP<Error, { data: Data; token: string | undefined }>(() =>
		client
			.sync<GurutzetaEntrySkeleton>({
				nextSyncToken: token,
			})
			.then((response) => ({
				data: parseData(response),
				token: response.nextSyncToken,
			}))
			.catch((error) => {
				throw parseError(error);
			}),
	);

const fetchOnce =
	(client: Client) => (nextToken: Either<Error, string | undefined>) =>
		fold(fetchInitial(client), fetchNext(client))(nextToken);

const fetchLoop =
	(client: Client) =>
	(
		nextToken: Either<Error, string | undefined>,
		previousData: Data = {} as Data,
	): FutureInstance<
		Error,
		{
			data: Data;
			token: string | undefined;
		}
	> =>
		chain<
			Error,
			{ data: Data; token: string | undefined },
			{ data: Data; token: string | undefined }
		>(({ data, token }) => {
			const oldToken = option<string | undefined, Error>(() => undefined)(
				nextToken,
			);
			const mergedData = mergeDeepWith(concat, previousData, data) as Data;
			if (oldToken === token) {
				return resolve({ data: mergedData, token });
			}

			return fetchLoop(client)(right(token), mergedData);
		})(fetchOnce(client)(nextToken));

export class ContentfulDataFetcher implements DataFetcher {
	private readonly client: Client;

	public constructor(private readonly storage: Storage) {
		this.client = createClient({
			space: option(() => "")(getEnv("REACT_APP_CONTENTFUL_SPACE_ID")),
			accessToken: option(() => "")(
				getEnv("REACT_APP_CONTENTFUL_ACCESS_TOKEN"),
			),
		});
	}

	public fetch() {
		const nextToken = this.storage.getItem<string>(nextTokenKey);
		return mapF(
			({ data, token }: { data: Data; token: string | undefined }) => {
				this.storage.setItem(nextTokenKey, token);
				return data;
			},
		)(fetchLoop(this.client)(nextToken));
	}

	public clear() {
		this.storage.removeItem(nextTokenKey);
	}
}
