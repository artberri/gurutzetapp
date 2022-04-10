import { Transition } from "@headlessui/react";
import { CalendarIcon, GlobeIcon, HeartIcon } from "@heroicons/react/outline";
import {
  CalendarIcon as CalendarIconSelected,
  GlobeIcon as GlobeIconSelected,
  HeartIcon as HeartIconSelected,
} from "@heroicons/react/solid";
import { fork } from "fluture";
import { pipe } from "ramda";
import { useCallback, useEffect, useState } from "react";
import "./App.css";
import { Layout } from "./components/Layout/Layout";
import { Loader } from "./components/Loader/Loader";
import { Logo } from "./components/Logo/Logo";
import { Schedule } from "./components/Schedule/Schedule";
import { TabPage, Tabs } from "./components/Tabs/Tabs";
import { noop } from "./cross-cutting/Noop";
import { Syncronizer } from "./domain/Syncronizer";
import { useOnlineStatus } from "./utils/OnlineStatus";
import { useService } from "./utils/Services";

export const App = () => {
  const isOnline = useOnlineStatus();
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<Error>();
  const syncronizer = useService(Syncronizer);

  const syncronizeData = useCallback(() => {
    if (!isOnline) {
      setIsLoading(false);
      return noop;
    }

    return pipe(
      fork<Error>((syncError) => {
        setError(syncError);
        setIsLoading(false);
      })(() => {
        setIsLoading(false);
      })
    )(syncronizer.sync());
  }, [isOnline, syncronizer]);

  useEffect(() => {
    const cancel = syncronizeData();

    return () => cancel();
  }, [syncronizeData]);

  console.log(error);

  const [pages] = useState<TabPage[]>([
    {
      id: "schedule",
      content: <Schedule />,
      icon: <CalendarIcon className="text-white" />,
      iconSelected: <CalendarIconSelected className="text-white" />,
    },
    {
      id: "favourites",
      content: <Loader />,
      icon: <HeartIcon className="text-white" />,
      iconSelected: <HeartIconSelected className="text-white" />,
    },
    {
      id: "map",
      content: <Loader />,
      icon: <GlobeIcon className="text-white" />,
      iconSelected: <GlobeIconSelected className="text-white" />,
    },
  ]);

  // eslint-disable-next-line unicorn/no-null
  return (
    <>
      <Transition
        className="App__Loader absolute h-100 w-100 flex flex-col items-center justify-center bg-black inset-0 z-20 "
        appear
        show={isLoading}
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
        show={!isLoading}
        enter="transition-opacity duration-200"
        enterFrom="opacity-0"
        enterTo="opacity-100"
        leave="transition-opacity duration-200"
        leaveFrom="opacity-100"
        leaveTo="opacity-0"
      >
        <Layout>
          <Tabs pages={pages} />
        </Layout>
      </Transition>
    </>
  );
};
