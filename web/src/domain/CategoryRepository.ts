import { Either } from "../cross-cutting/Either";
import { Category } from "./Category";

export abstract class CategoryRepository {
  public abstract getCategory(id: string): Either<Error, Category>;
  public abstract getCategories(): Either<Error, ReadonlyArray<Category>>;
  public abstract save(activities: readonly Category[]): void;
  public abstract remove(activities: readonly Category[]): void;
}
