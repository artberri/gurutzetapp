import { map, pipe } from "ramda";
import { option } from "../cross-cutting/Either";
import type { Category } from "./Category";
import type { Storage } from "./Storage";

const categoryStorageKey = "GURUTZETAPP_CATEGORIES_2026";

export class CategoryStorage {
	private readonly storage: Storage;

	public constructor(storage: Storage) {
		this.storage = storage;
	}

	public get() {
		const categories = this.storage.getItem<Category[]>(categoryStorageKey);
		return option<Category[]>(() => [])(categories);
	}

	public save(categories: readonly Category[]) {
		const newCategoryIds = map((a: Category) => a.id)(categories);
		const updateCategories = pipe(
			(previous: readonly Category[]) =>
				previous.filter((a) => !newCategoryIds.includes(a.id)),
			(previous: readonly Category[]) => [...previous, ...categories],
		);

		const toSave = updateCategories(this.get());
		this.storage.setItem(categoryStorageKey, toSave);
	}

	public remove(categories: readonly Category[]) {
		const toRemoveCategoryIds = map((a: Category) => a.id)(categories);
		const removeCategories = (previous: readonly Category[]) =>
			previous.filter((a) => !toRemoveCategoryIds.includes(a.id));
		const toSave = removeCategories(this.get());
		this.storage.setItem(categoryStorageKey, toSave);
	}

	public clear() {
		this.storage.removeItem(categoryStorageKey);
	}
}
