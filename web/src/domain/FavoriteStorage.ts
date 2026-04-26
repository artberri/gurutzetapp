import { option } from "../cross-cutting/Either";
import type { Storage } from "./Storage";

const favoriteStorageKey = "GURUTZETAPP_FAVORITES_2026";

export class FavoriteStorage {
	private readonly storage: Storage;

	public constructor(storage: Storage) {
		this.storage = storage;
	}

	public getFavorites() {
		return option<string[]>(() => [])(
			this.storage.getItem<string[]>(favoriteStorageKey),
		);
	}

	public save(favorites: string[]) {
		this.storage.setItem(favoriteStorageKey, favorites);
	}
}
