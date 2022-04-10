import Future from "fluture";
import { ContentfulClientApi, createClient } from "contentful";
import { getEnv } from "./GetEnv";
import { option } from "../cross-cutting/Either";
import { Data, DataFetcher } from "../domain/DataFetcher";

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
    console.log(this.client);
    return Future<Error, Data>((reject) => {
      const timeoutId = setTimeout(() => {
        reject(new Error("ss"));
      }, 3000);

      // Here is how we handle cancellation. This signal is received when nobody
      // is interested in the answer any more.
      return function onCancel() {
        // Clearing the timeout releases the resources we were holding.
        clearTimeout(timeoutId);
      };
    });
  }
}
