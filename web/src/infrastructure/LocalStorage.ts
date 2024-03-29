import { left, right } from "../cross-cutting/Either"
import { parseError } from "../utils/ErrorUtils"
import { Storage } from "../domain/Storage"

export class LocalStorage implements Storage {
	private readonly localStorage = localStorage

	public getItem<T>(key: string) {
		const value = this.localStorage.getItem(key)
		if (!value) {
			return left<T>(new Error(`No ${key} found in local storage`))
		}

		try {
			return right(JSON.parse(value) as T)
		} catch (error) {
			return left<T>(parseError(error))
		}
	}

	public setItem<T>(key: string, value: T) {
		this.localStorage.setItem(key, JSON.stringify(value))
	}

	public removeItem(key: string) {
		this.localStorage.removeItem(key)
	}
}
