import Future from "fluture";
/* import { createClient as contentfulCreateClient } from "contentful";
import { getEnv } from "../utils/GetEnv";

const createClient = () =>
  contentfulCreateClient({
    space: getEnv("REACT_APP_CONTENTFUL_SPACE_ID"),
    accessToken: getEnv("REACT_APP_CONTENTFUL_ACCESS_TOKEN"),
  });

export const sync = () => {
  const client = createClient();
  void client
    .sync({
      initial: true,
      limit: 2,
    })
    .then((response) => {
      const responseObject = JSON.parse(response.stringifySafe()) as {
        entries: string;
      };
      const { entries } = responseObject;
      console.log(entries);
    });
};
*/

export const sync = () =>
  Future<Error, void>((reject) => {
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
