import { FutureInstance } from "fluture";
import { Activity } from "./Activity";

interface FetchedData {
  readonly activities: ReadonlyArray<Activity>;
}

export interface Data {
  readonly modified: FetchedData;
  readonly removed: FetchedData;
}

export abstract class DataFetcher {
  public abstract fetch(): FutureInstance<Error, Data>;
}
