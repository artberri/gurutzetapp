import { pipe, map, filter, concat } from "ramda";
import { chain, option, right, left } from "../cross-cutting/Either";
import { Category } from "../domain/Category";
import { CategoryRepository } from "../domain/CategoryRepository";
import { Storage } from "../domain/Storage";
import { just, nothing, fold } from "../cross-cutting/Maybe";

const categoryStorageKey = "GURUTZETAPP_CATEGORIES";

export class StorageCategoryRepository implements CategoryRepository {
  private categories = nothing<Category[]>();

  public constructor(private readonly storage: Storage) {}

  public getCategories() {
    return this.getCachedCategories();
  }

  public getCategory(id: string) {
    return chain((categories: Category[]) => {
      const category = categories.find((c) => c.id === id);
      return category
        ? right(category)
        : left<Category>(new Error("Category not found"));
    })(this.getCachedCategories());
  }

  public save(categories: Category[]) {
    const newCategoryIds = map((a: Category) => a.id)(categories);
    const updateCategories = pipe(
      option<Category[]>(() => []),
      filter<Category>((a) => !newCategoryIds.includes(a.id)),
      concat(categories),
    );

    const toSave = updateCategories(this.getCachedCategories());
    this.categories = just(toSave);
    this.storage.setItem(categoryStorageKey, toSave);
  }

  public remove(categories: Category[]) {
    const toRemoveCategoryIds = map((a: Category) => a.id)(categories);
    const removeCategories = pipe(
      option<Category[]>(() => []),
      filter<Category>((a) => !toRemoveCategoryIds.includes(a.id)),
    );
    const toSave = removeCategories(this.getCachedCategories());
    this.categories = just(toSave);
    this.storage.setItem(categoryStorageKey, toSave);
  }

  private getCachedCategories() {
    return fold(
      () => this.storage.getItem<Category[]>(categoryStorageKey),
      (categories: Category[]) => right(categories),
    )(this.categories);
  }
}
