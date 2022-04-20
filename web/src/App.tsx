import { Transition } from "@headlessui/react";
import { CalendarIcon, GlobeIcon, HeartIcon } from "@heroicons/react/outline";
import {
  CalendarIcon as CalendarIconSelected,
  GlobeIcon as GlobeIconSelected,
  HeartIcon as HeartIconSelected,
} from "@heroicons/react/solid";
import { fork, FutureInstance } from "fluture";
import { useCallback, useEffect, useMemo, useState } from "react";
import "./App.css";
import { Layout } from "./components/Layout";
import { Loader } from "./components/Loader";
import { Logo } from "./components/Logo";
import { Schedule } from "./components/Schedule";
import { TabPage, Tabs } from "./components/Tabs";
import { noop } from "./cross-cutting/Noop";
import { Syncronizer } from "./domain/Syncronizer";
import { useOnlineStatus } from "./utils/OnlineStatusUtils";
import { useService } from "./utils/ServiceUtils";
import { AppProviders } from "./AppProviders";
import { Favorites } from "./components/Favorites";
import { Map } from "./components/Map";
import { Tracer } from "./domain/Tracer";
import { useServiceWorker } from "./utils/ServiceWorkerUtils";

export interface AppProperties {
  getReady: FutureInstance<Error, void>;
}

export const App = ({ getReady }: AppProperties) => {
  const [selectedIndex, setSelectedIndex] = useState(0);
  const isOnline = useOnlineStatus();
  const [isLoading, setIsLoading] = useState(true);
  const [isReady, setIsReady] = useState(false);
  const syncronizer = useService(Syncronizer);
  const tracer = useService(Tracer);
  const { forceUpdate } = useServiceWorker();

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
        content: <Favorites onBack={() => setSelectedIndex(0)} />,
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
    [],
  );

  const showApp = !isLoading && isReady;

  const handleTabChange = useCallback(
    (index: number) => {
      // eslint-disable-next-line no-console
      console.log("handleTabChange", index);
      setSelectedIndex(index);
      forceUpdate();
      console.log("forceUpdate called", index);
    },
    [forceUpdate],
  );

  // eslint-disable-next-line unicorn/no-null
  return (
    <>
      <Transition
        className="App__Loader absolute h-100 w-100 flex flex-col items-center justify-center bg-black inset-0 z-20 "
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
        show={showApp}
        enter="transition-opacity duration-200"
        enterFrom="opacity-0"
        enterTo="opacity-100"
        leave="transition-opacity duration-200"
        leaveFrom="opacity-100"
        leaveTo="opacity-0"
      >
        <AppProviders>
          <Layout>
            <Tabs
              pages={pages}
              selectedIndex={selectedIndex}
              onChange={handleTabChange}
            />
          </Layout>
        </AppProviders>
      </Transition>
    </>
  );
};
