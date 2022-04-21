import { Switch } from "@headlessui/react";
import { useTranslation } from "react-i18next";

export const LanguageSwitch = () => {
  const { i18n } = useTranslation();
  const checked = i18n.resolvedLanguage === "es";

  const toggleLanguage = () => {
    if (checked) {
      void i18n.changeLanguage("eu");
    } else {
      void i18n.changeLanguage("es");
    }
  };

  return (
    <div className="flex items-center text-slate-500 h-full">
      <div className="pr-1">EU</div>
      <Switch
        checked={checked}
        onChange={toggleLanguage}
        className="bg-primary relative inline-flex flex-shrink-0 h-[26px] w-[50px] border-2 border-transparent rounded-full cursor-pointer transition-colors ease-in-out duration-200 focus:outline-none focus-visible:ring-2  focus-visible:ring-white focus-visible:ring-opacity-75"
      >
        <span className="sr-only">Cambiar idioma (marcar es castellano)</span>
        <span
          aria-hidden="true"
          className={`${checked ? "translate-x-[24px]" : "translate-x-[1px]"}
          translate-y-[1px] pointer-events-none inline-block h-[20px] w-[20px] rounded-full bg-white shadow-lg transform ring-0 transition ease-in-out duration-200`}
        />
      </Switch>
      <div className="pl-1">ES</div>
    </div>
  );
};
