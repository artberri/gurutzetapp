import { Either } from "../cross-cutting/Either"

export abstract class Storage {
	public abstract getItem<T>(key: string): Either<Error, T>
	public abstract setItem<T>(key: string, value: T): void
	public abstract removeItem(key: string): void
}
