import contentful from "contentful";
import { getEnv } from "../utils/GetEnv";

const client = contentful.createClient({
  space: getEnv("REACT_APP_CONTENTFUL_SPACE_ID"),
  accessToken: getEnv("REACT_APP_CONTENTFUL_ACCESS_TOKEN"),
});

console.log(client);
