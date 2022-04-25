import { Transition } from "@headlessui/react";
import { CalendarIcon, GlobeIcon, HeartIcon } from "@heroicons/react/outline";
import {
  CalendarIcon as CalendarIconSelected,
  GlobeIcon as GlobeIconSelected,
  HeartIcon as HeartIconSelected,
} from "@heroicons/react/solid";
import { fork, FutureInstance } from "fluture";
import { useCallback, useEffect, useMemo, useState } from "react";
import "./Content.css";
import { useTranslation } from "react-i18next";
import { Layout } from "./components/Layout";
import { Loader } from "./components/Loader";
import { Logo } from "./components/Logo";
import { Schedule } from "./components/Schedule";
import { TabPage, Tabs } from "./components/Tabs";
import { noop } from "./cross-cutting/Noop";
import { Syncronizer } from "./domain/Syncronizer";
import { useOnlineStatus } from "./utils/OnlineStatusUtils";
import { useService } from "./utils/ServiceUtils";
import { ContentProviders } from "./ContentProviders";
import { Favorites } from "./components/Favorites";
import { Map } from "./components/Map";
import { Tracer } from "./domain/Tracer";
import { useAppState } from "./utils/AppStateUtils";

export interface ContentProperties {
  getReady: FutureInstance<Error, void>;
}

export const Content = ({ getReady }: ContentProperties) => {
  const { i18n } = useTranslation();
  const { tab, goToTab, goToScheduleTab } = useAppState();
  const isOnline = useOnlineStatus();
  const [isLoading, setIsLoading] = useState(true);
  const [isReady, setIsReady] = useState(false);
  const syncronizer = useService(Syncronizer);
  const tracer = useService(Tracer);

  useEffect(() => {
    document.documentElement.lang = i18n.resolvedLanguage;
  }, [i18n.resolvedLanguage]);

  useEffect(() => {
    const cancel = fork<Error>((readyError) => {
      tracer.trace(readyError);
      setIsReady(true);
    })(() => {
      setIsReady(true);
    })(getReady);

    return () => cancel();
  }, [getReady, tracer]);

  const syncronizeData = useCallback(() => {
    if (!isOnline) {
      setIsLoading(false);
      return noop;
    }

    return fork<Error>((syncError) => {
      tracer.trace(syncError);
      setIsLoading(false);
    })(() => {
      setIsLoading(false);
    })(syncronizer.sync());
  }, [isOnline, syncronizer, tracer]);

  useEffect(() => {
    const cancel = syncronizeData();

    return () => cancel();
  }, [syncronizeData]);

  const pages = useMemo<TabPage[]>(
    () => [
      {
        id: "schedule",
        content: <Schedule />,
        icon: <CalendarIcon className="text-white" />,
        iconSelected: <CalendarIconSelected className="text-white" />,
      },
      {
        id: "favourites",
        content: <Favorites onBack={() => goToScheduleTab()} />,
        icon: <HeartIcon className="text-white" />,
        iconSelected: <HeartIconSelected className="text-white" />,
      },
      {
        id: "map",
        content: <Map />,
        icon: <GlobeIcon className="text-white" />,
        iconSelected: <GlobeIconSelected className="text-white" />,
      },
    ],
    [goToScheduleTab],
  );

  const showApp = !isLoading && isReady;

  // eslint-disable-next-line unicorn/no-null
  return (
    <>
      <Transition
        className="Content__Loader absolute h-full w-full flex flex-col items-center justify-center bg-black inset-0 z-20 "
        appear
        show={!showApp}
        enter="transition-opacity duration-200"
        enterFrom="opacity-0"
        enterTo="opacity-100"
        leave="transition-opacity duration-200"
        leaveFrom="opacity-100"
        leaveTo="opacity-0"
      >
        <Logo />
        <Loader />
      </Transition>
      <Transition
        className="h-full w-full"
        show={showApp}
        enter="transition-opacity duration-200"
        enterFrom="opacity-0"
        enterTo="opacity-100"
        leave="transition-opacity duration-200"
        leaveFrom="opacity-100"
        leaveTo="opacity-0"
      >
        <ContentProviders>
          <Layout>
            <Tabs pages={pages} selectedIndex={tab} onChange={goToTab} />
          </Layout>
        </ContentProviders>
      </Transition>
    </>
  );
};
