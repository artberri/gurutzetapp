export interface DeletedEntry {
	readonly sys: {
		readonly id: string
		readonly type: "DeletedEntry"
	}
}

export interface ContentfulVenueEntry {
	readonly sys: {
		readonly id: string
		readonly type: "Entry"
		readonly contentType: {
			readonly sys: {
				id: "venue"
			}
		}
	}

	readonly fields: {
		category: {
			es: "public" | "official" | "business"
		}
		location: {
			es: {
				lat: number
				lon: number
			}
		}
		name: {
			es: string
			eu: string
		}
	}
}

export interface ContentfulCategoryEntry {
	readonly sys: {
		readonly id: string
		readonly type: "Entry"
		readonly contentType: {
			readonly sys: {
				id: "category"
			}
		}
	}

	readonly fields: {
		label: {
			es: string
		}
		name: {
			es: string
			eu: string
		}
	}
}

export interface ContentfulActivityEntry {
	readonly sys: {
		readonly id: string
		readonly type: "Entry"
		readonly contentType: {
			readonly sys: {
				id: "activity"
			}
		}
	}

	readonly fields: {
		description: {
			es: string
			eu: string
		}
		date: {
			es: string
		}
		dateEnd?: {
			es: string
		}
		category: {
			es: {
				readonly sys: {
					readonly id: string
				}
			}
		}
		venue?: {
			es: {
				readonly sys: {
					readonly id: string
				}
			}
		}
	}
}

export type ContentfulEntry =
	| ContentfulActivityEntry
	| ContentfulCategoryEntry
	| ContentfulVenueEntry
