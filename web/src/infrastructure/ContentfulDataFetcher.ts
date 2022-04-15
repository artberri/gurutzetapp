import { attemptP, map as mapF, chain, resolve, FutureInstance } from "fluture";
import { ContentfulClientApi, createClient, SyncCollection } from "contentful";
import { concat, filter, map, mergeDeepWith, pipe } from "ramda";
import { getEnv } from "./GetEnv";
import { Storage } from "./Storage";
import { Either, fold, option, right } from "../cross-cutting/Either";
import { Data, DataFetcher } from "../domain/DataFetcher";
import { Activity } from "../domain/Activity";
import {
  ContentfulActivityEntry,
  ContentfulCategoryEntry,
  ContentfulEntry,
  ContentfulVenueEntry,
  DeletedEntry,
} from "./ContentfulModels";
import { parseError } from "../utils/Error";
import { Category } from "../domain/Category";
import { Venue } from "../domain/Venue";

const nextTokenKey = "GURUTZETAPP_NEXT_TOKEN";

const mapActivity = (entry: ContentfulActivityEntry): Activity => ({
  id: entry.sys.id,
  date: new Date(entry.fields.date.es),
  dateEnd: entry.fields.dateEnd ? new Date(entry.fields.dateEnd.es) : undefined,
  description: {
    es: entry.fields.description.es,
    eu: entry.fields.description.eu,
  },
  categoryId: entry.fields.category.es.sys.id,
});

const mapRemovedActivity = (entry: DeletedEntry): Activity => ({
  id: entry.sys.id,
  date: new Date(),
  description: {
    es: "",
    eu: "",
  },
  categoryId: "",
});

const mapCategory = (entry: ContentfulCategoryEntry): Category => ({
  id: entry.sys.id,
  label: entry.fields.label.es,
  name: {
    es: entry.fields.name.es,
    eu: entry.fields.name.eu,
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

const mapVenue = (entry: ContentfulVenueEntry): Venue => ({
  id: entry.sys.id,
  name: {
    es: entry.fields.name.es,
    eu: entry.fields.name.eu,
  },
  category: entry.fields.category.es,
  location: {
    lat: entry.fields.location.es.lat,
    lng: entry.fields.location.es.lon,
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
  entry: ContentfulEntry
): entry is ContentfulActivityEntry => {
  const activity = entry as ContentfulActivityEntry;
  return (
    activity?.sys?.type === "Entry" &&
    activity?.sys?.contentType?.sys?.id === "activity"
  );
};

const isCategory = (
  entry: ContentfulEntry
): entry is ContentfulCategoryEntry => {
  const category = entry as ContentfulCategoryEntry;
  return (
    category?.sys?.type === "Entry" &&
    category?.sys?.contentType?.sys?.id === "category"
  );
};

const isVenue = (entry: ContentfulEntry): entry is ContentfulVenueEntry => {
  const venue = entry as ContentfulVenueEntry;
  return (
    venue?.sys?.type === "Entry" && venue?.sys?.contentType?.sys?.id === "venue"
  );
};

const getActivities = pipe(
  (entries: ContentfulEntry[]) => filter(isActivity)(entries),
  map(mapActivity)
);

const getCategories = pipe(
  (entries: ContentfulEntry[]) => filter(isCategory)(entries),
  map(mapCategory)
);

const getVenues = pipe(
  (entries: ContentfulEntry[]) => filter(isVenue)(entries),
  map(mapVenue)
);

const parseData = (response: SyncCollection): Data => {
  const responseObject = JSON.parse(response.stringifySafe()) as {
    readonly entries: ContentfulEntry[];
    readonly deletedEntries: DeletedEntry[];
  };
  const { entries, deletedEntries } = responseObject;

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

const fetchInitial = (client: ContentfulClientApi) => () =>
  attemptP<Error, { data: Data; token: string }>(() =>
    client
      .sync({
        initial: true,
      })
      .then((response) => ({
        data: parseData(response),
        token: response.nextSyncToken,
      }))
      .catch((error) => {
        throw parseError(error);
      })
  );

const fetchNext = (client: ContentfulClientApi) => (token: string) =>
  attemptP<Error, { data: Data; token: string }>(() =>
    client
      .sync({
        nextSyncToken: token,
      })
      .then((response) => ({
        data: parseData(response),
        token: response.nextSyncToken,
      }))
      .catch((error) => {
        throw parseError(error);
      })
  );

const fetchOnce =
  (client: ContentfulClientApi) => (nextToken: Either<Error, string>) =>
    fold(fetchInitial(client), fetchNext(client))(nextToken);

const fetchLoop =
  (client: ContentfulClientApi) =>
  (
    nextToken: Either<Error, string>,
    previousData: Data = {} as Data
  ): FutureInstance<
    Error,
    {
      data: Data;
      token: string;
    }
  > =>
    chain<Error, { data: Data; token: string }, { data: Data; token: string }>(
      ({ data, token }) => {
        const oldToken = option(() => "")(nextToken);
        const mergedData = mergeDeepWith(concat, previousData, data) as Data;
        if (oldToken === token) {
          return resolve({ data: mergedData, token });
        }

        return fetchLoop(client)(right(token), mergedData);
      }
    )(fetchOnce(client)(nextToken));

export class ContentfulDataFetcher implements DataFetcher {
  private readonly client: ContentfulClientApi;

  public constructor(private readonly storage: Storage) {
    this.client = createClient({
      space: option(() => "")(getEnv("REACT_APP_CONTENTFUL_SPACE_ID")),
      accessToken: option(() => "")(
        getEnv("REACT_APP_CONTENTFUL_ACCESS_TOKEN")
      ),
    });
  }

  public fetch() {
    const nextToken = this.storage.getItem<string>(nextTokenKey);
    return mapF(({ data, token }: { data: Data; token: string }) => {
      this.storage.setItem(nextTokenKey, token);
      return data;
    })(fetchLoop(this.client)(nextToken));
  }
}
