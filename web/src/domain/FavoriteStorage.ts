import { option } from "../cross-cutting/Either"
import { Storage } from "./Storage"

const favoriteStorageKey = "GURUTZETAPP_FAVORITES_2023"

export class FavoriteStorage {
	public constructor(private readonly storage: Storage) {}

	public getFavorites() {
		return option<string[]>(() => [])(
			this.storage.getItem<string[]>(favoriteStorageKey)
		)
	}

	public save(favorites: string[]) {
		this.storage.setItem(favoriteStorageKey, favorites)
	}
}
