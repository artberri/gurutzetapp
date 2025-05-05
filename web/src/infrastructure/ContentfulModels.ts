import type { EntryFieldTypes } from "contentful";

export interface DeletedEntry {
	readonly sys: {
		readonly id: string;
		readonly type: "DeletedEntry";
	};
}

export interface VenueEntrySkeleton {
	contentTypeId: "venue";
	fields: {
		category: EntryFieldTypes.Text<"public" | "official" | "business">;
		location: EntryFieldTypes.Location;
		name: EntryFieldTypes.Text;
	};
}

export interface CategoryEntrySkeleton {
	contentTypeId: "category";
	fields: {
		label: EntryFieldTypes.Text;
		name: EntryFieldTypes.Text;
	};
}

export interface ActivityEntrySkeleton {
	contentTypeId: "activity";
	fields: {
		description: EntryFieldTypes.Text;
		date: EntryFieldTypes.Date;
		dateEnd?: EntryFieldTypes.Date;
		category: EntryFieldTypes.EntryLink<CategoryEntrySkeleton>;
		venue?: EntryFieldTypes.EntryLink<VenueEntrySkeleton>;
		type?: EntryFieldTypes.Text<"normal" | "official" | "important">;
	};
}

export type GurutzetaEntrySkeleton =
	| ActivityEntrySkeleton
	| CategoryEntrySkeleton
	| VenueEntrySkeleton;
