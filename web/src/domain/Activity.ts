import { Category } from "./Category";
import { LocalizedText } from "./LocalizedText";

export interface Activity {
  readonly id: string;
  readonly date: Date;
  readonly description: LocalizedText;
  readonly category: Category;
}
