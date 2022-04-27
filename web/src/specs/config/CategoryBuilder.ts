import { randUuid } from "@ngneat/falso";
import { Category } from "../../domain/Category";

export const buildCategory = (name: string): Category => ({
  id: randUuid(),
  name: {
    eu: `${name} Eu`,
    es: `${name} Es`,
  },
  label: name.toLowerCase().replaceAll(" ", "-"),
});

export const buildCategories = (names: string[]): Category[] =>
  names.map((n) => buildCategory(n));
