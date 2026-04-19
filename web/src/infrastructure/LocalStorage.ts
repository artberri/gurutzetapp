import { left, right } from "../cross-cutting/Either";
import type { Storage } from "../domain/Storage";
import { parseError } from "../utils/ErrorUtils";

export class LocalStorage implements Storage {
	private readonly localStorage = localStorage;

	public getItem<T>(key: string) {
		const value = this.localStorage.getItem(key);
		if (!value) {
			return left<T>(new Error(`No ${key} found in local storage`));
		}

		try {
			return right(JSON.parse(value) as T);
		} catch (error) {
			return left<T>(parseError(error));
		}
	}

	public setItem(key: string, value: unknown) {
		this.localStorage.setItem(key, JSON.stringify(value));
	}

	public removeItem(key: string) {
		this.localStorage.removeItem(key);
	}
}
