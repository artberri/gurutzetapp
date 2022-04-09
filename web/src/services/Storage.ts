import { left, right } from "../cross-cutting/Either";

export const hastItem = (key: string) => {
  const value = localStorage.getItem(key);

  return !!value;
};

export const getItem = <T>(key: string) => {
  const value = localStorage.getItem(key);
  if (!value) {
    return left<T>(new Error(`No ${key} found in local storage`));
  }

  try {
    return right(JSON.parse(value) as T);
  } catch (error) {
    return left<T>(error instanceof Error ? error : new Error(String(error)));
  }
};

export const setItem = <T>(key: string, value: T) =>
  localStorage.setItem(key, JSON.stringify(value));
