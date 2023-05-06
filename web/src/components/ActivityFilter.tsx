import { Fragment, useMemo, useState } from "react";
import { Listbox, Transition } from "@headlessui/react";
import { CheckIcon, SelectorIcon } from "@heroicons/react/solid";
import { useTranslation } from "react-i18next";
import { pipe, map, filter, prepend, sort } from "ramda";
import { useCategories } from "../utils/CategoryUtils";
import { isRight, option, Either } from "../cross-cutting/Either";
import { Category } from "../domain/Category";
import { just, nothing, fold, Maybe } from "../cross-cutting/Maybe";

export interface ActivityFilterProperties {
  categoryIds: string[];
  onChange: (categoryId: Maybe<Category>) => void;
}

export const ActivityFilter = ({
  categoryIds,
  onChange,
}: ActivityFilterProperties) => {
  const { i18n, t } = useTranslation();
  const lang = i18n.resolvedLanguage as "es" | "eu";
  const { getCategory } = useCategories();

  const categories = useMemo(
    () =>
      pipe(
        map((id: string) => getCategory(id)),
        filter<Either<Error, Category>>((c) => isRight(c)),
        map(
          (c) => option<Category | undefined>(() => undefined)(c) as Category,
        ),
        sort((a, b) => (a.name[lang] < b.name[lang] ? -1 : 1)),
        map(just),
        prepend(nothing()),
      )(categoryIds),
    [categoryIds, getCategory, lang],
  );

  // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
  const [selected, setSelected] = useState(categories[0]!);

  const getCategoryId = fold(
    () => "placeholder",
    (category: Category) => category.id,
  );
  const getCategoryName = fold(
    () => t("nofilters"),
    (category: Category) => category.name[lang],
  );

  const handleChange = (category: Maybe<Category>) => {
    setSelected(category);
    onChange(category);
  };

  return (
    <Listbox value={selected} onChange={handleChange}>
      <div className="relative w-full">
        <Listbox.Button className="relative w-full py-2 pl-3 pr-10 text-left bg-white rounded-lg cursor-default focus:outline-none sm:text-sm">
          <span className="block truncate">{getCategoryName(selected)}</span>
          <span className="absolute inset-y-0 right-0 flex items-center pr-2 pointer-events-none">
            <SelectorIcon
              className="w-5 h-5 text-gray-400"
              aria-hidden="true"
            />
          </span>
        </Listbox.Button>
        <Transition
          as={Fragment}
          leave="transition ease-in duration-100"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <Listbox.Options className="absolute w-full py-1 mt-1 overflow-auto text-base bg-white rounded-md shadow-lg max-h-60 ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm">
            {categories.map((category) => (
              <Listbox.Option
                key={getCategoryId(category)}
                className={({ active }) =>
                  `cursor-default select-none relative py-2 pl-10 pr-4 text-slate-700 ${
                    active ? "bg-primary-100" : ""
                  }`
                }
                value={category}
              >
                {({ selected: active }) => (
                  <>
                    <span
                      className={`block truncate ${
                        active ? "font-medium" : "font-normal"
                      }`}
                    >
                      {getCategoryName(category)}
                    </span>
                    {active && (
                      <span className="absolute inset-y-0 left-0 flex items-center pl-3 text-primary">
                        <CheckIcon className="w-5 h-5" aria-hidden="true" />
                      </span>
                    )}
                  </>
                )}
              </Listbox.Option>
            ))}
          </Listbox.Options>
        </Transition>
      </div>
    </Listbox>
  );
};
