import { left, right } from "../../cross-cutting/Either";
import { Storage } from "../../domain/Storage";

export class InMemoryStorage implements Storage {
  private readonly store: Record<string, unknown> = {};

  public getItem<T>(key: string) {
    const value = this.store[key];
    if (!value) {
      return left<T>(new Error(`No ${key} found in local storage`));
    }

    return right(value as T);
  }

  public setItem<T>(key: string, value: T) {
    this.store[key] = value;
  }

  public removeItem(key: string) {
    delete this.store[key];
  }
}
