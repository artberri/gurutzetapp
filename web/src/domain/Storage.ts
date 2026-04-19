import type { Either } from "../cross-cutting/Either";

export abstract class Storage {
	public abstract getItem<T>(key: string): Either<Error, T>;
	public abstract setItem(key: string, value: unknown): void;
	public abstract removeItem(key: string): void;
}
