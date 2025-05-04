import type { Maybe } from "../cross-cutting/Maybe";
import type { LocalizedText } from "./LocalizedText";

export interface Activity {
	readonly id: string;
	readonly date: Date;
	readonly dateEnd?: Date;
	readonly description: LocalizedText;
	readonly categoryId: string;
	readonly venueId: Maybe<string>;
	readonly type: "normal" | "official" | "important";
}
