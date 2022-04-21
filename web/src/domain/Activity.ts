import { Maybe } from "../cross-cutting/Maybe";
import { LocalizedText } from "./LocalizedText";

export interface Activity {
  readonly id: string;
  readonly date: Date;
  readonly dateEnd?: Date;
  readonly description: LocalizedText;
  readonly categoryId: string;
  readonly venueId: Maybe<string>;
}
