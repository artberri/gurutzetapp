import { Transition } from "@headlessui/react";
import { ReactNode } from "react";
import { useTranslation } from "react-i18next";
import { useServiceWorker } from "../utils/ServiceWorkerUtils";
import { Header } from "./Header";

export interface LayoutProperties {
  children: ReactNode;
}

export const Layout = ({ children }: LayoutProperties) => {
  const { t } = useTranslation();
  const { showReload, reloadPage } = useServiceWorker();

  return (
    <div className="bg-white h-screen w-screen flex flex-col">
      <Header className="flex-none  shadow-lg z-10" />
      <Transition
        show={showReload}
        enter="transition-height duration-300"
        enterFrom="h-0"
        enterTo="h-15"
        leave="transition-height duration-300"
        leaveFrom="h-15"
        leaveTo="h-0"
      >
        <div className="h-15 p-3 bg-amber-300 text-amber-700 flex justify-between items-center">
          <div>{t("update.message")}</div>
          <button
            type="button"
            className="bg-white px-2 py-1 shadow-lg rounded-lg"
            onClick={() => reloadPage()}
          >
            {t("update.button")}
          </button>
        </div>
      </Transition>
      <main className="bg-s grow flex flex-col bg-slate-100  overflow-y-auto">
        {children}
      </main>
    </div>
  );
};
