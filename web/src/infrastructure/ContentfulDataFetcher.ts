import { attemptP } from "fluture";
import { ContentfulClientApi, createClient } from "contentful";
import { filter, map, pipe } from "ramda";
import { getEnv } from "./GetEnv";
import { option } from "../cross-cutting/Either";
import { Data, DataFetcher } from "../domain/DataFetcher";
import { Activity } from "../domain/Activity";
import { ContentfulActivityEntry } from "./ContentfulActivityEntry";

const mapActivity = (entry: ContentfulActivityEntry): Activity => ({
  id: entry.sys.id,
  date: new Date(entry.fields.date.es),
  description: {
    es: entry.fields.description.es,
    eu: entry.fields.description.eu,
  },
  category: {
    id: entry.fields.category.es.sys.id,
    label: entry.fields.category.es.fields.label.es,
    name: {
      es: entry.fields.category.es.fields.name.es,
      eu: entry.fields.category.es.fields.name.eu,
    },
  },
});

const isActivity = (entry: unknown): entry is ContentfulActivityEntry => {
  const activity = entry as ContentfulActivityEntry;
  return (
    activity?.sys?.type === "Entry" &&
    activity?.sys?.contentType?.sys?.id === "activity"
  );
};

const getActivities = pipe(
  (entries: unknown[]) => filter(isActivity)(entries),
  map(mapActivity)
);

export class ContentfulDataFetcher implements DataFetcher {
  private readonly client: ContentfulClientApi;

  public constructor() {
    this.client = createClient({
      space: option(() => "")(getEnv("REACT_APP_CONTENTFUL_SPACE_ID")),
      accessToken: option(() => "")(
        getEnv("REACT_APP_CONTENTFUL_ACCESS_TOKEN")
      ),
    });
  }

  public fetch() {
    return attemptP<Error, Data>(() =>
      this.client
        .sync({
          initial: true,
        })
        .then((response) => {
          const responseObject = JSON.parse(response.stringifySafe()) as {
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
            readonly entries: any[];
          };
          const { entries } = responseObject;

          return {
            modified: {
              activities: getActivities(entries),
            },
            removed: {
              activities: [],
            },
          };
        })
        .catch((error) => {
          if (error instanceof Error) {
            throw error;
          }

          throw new Error(String(error));
        })
    );
  }
}
