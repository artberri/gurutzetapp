import { left, right } from "../cross-cutting/Either";
import { Storage } from "./Storage";

export class LocalStorage implements Storage {
  private readonly localStorage = localStorage;

  public hasItem(key: string) {
    const value = this.localStorage.getItem(key);

    return !!value;
  }

  public getItem<T>(key: string) {
    const value = this.localStorage.getItem(key);
    if (!value) {
      return left<T>(new Error(`No ${key} found in local storage`));
    }

    try {
      return right(JSON.parse(value) as T);
    } catch (error) {
      return left<T>(error instanceof Error ? error : new Error(String(error)));
    }
  }

  public setItem<T>(key: string, value: T) {
    return this.localStorage.setItem(key, JSON.stringify(value));
  }

  public removeItem(key: string) {
    this.localStorage.removeItem(key);
  }
}
