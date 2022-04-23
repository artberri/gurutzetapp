import {
  createContext,
  ReactNode,
  useContext,
  useEffect,
  useMemo,
  useState,
} from "react";
import { just, Maybe, nothing } from "../cross-cutting/Maybe";
import { noop } from "../cross-cutting/Noop";

export const enum Tab {
  Schedule = 0,
  Favorites = 1,
  Map = 2,
}
export type Coordinates = [lat: number, lng: number];
export type Map = {
  center: Coordinates;
  zoom: number;
};

const defaultMap: Map = {
  center: [43.281_503_7, -2.987_221_7],
  zoom: 15,
};

interface HistoryState {
  tab: Tab;
  map: Map;
  date: Date | undefined;
}

interface HistoryUpdatedEvent extends Event {
  detail?: HistoryState;
}

const isHistoryState = (value: unknown): value is HistoryState => {
  const historyState = value as HistoryState;
  return (
    typeof historyState === "object" &&
    historyState !== null &&
    typeof historyState.tab === "number" &&
    typeof historyState.map === "object" &&
    historyState.map !== null
  );
};

const historyEventName = "historyupdated";

const pushState = (historyState: HistoryState) => {
  const rootElement = document.querySelector("#root") || undefined;
  window.history.pushState(
    {
      map: historyState.map,
      tab: historyState.tab,
      date: historyState.date ? historyState.date.toISOString() : undefined,
    },
    document.title,
  );
  rootElement?.dispatchEvent(
    new CustomEvent(historyEventName, { detail: historyState }),
  );
};

const goBack = () => window.history.go(-1);
const goToTab = (tab: Tab, options: { map?: Map; date?: Date } = {}) => {
  const { map, date } = options;
  pushState({
    tab,
    map: map ?? defaultMap,
    date,
  });
};
const goToScheduleTab = (date?: Date) => goToTab(Tab.Schedule, { date });
const goToFavoritesTab = () => goToTab(Tab.Favorites);
const goToMapTab = (map?: Map) => goToTab(Tab.Map, { map });

export interface AppState {
  map: Map;
  tab: Tab;
  date: Maybe<Date>;
  goToTab: (tab: Tab) => void;
  goToScheduleTab: () => void;
  goToDay: (date: Date) => void;
  goToFavoritesTab: () => void;
  goToMapTab: () => void;
  zoomMapTo: (center: Coordinates) => void;
  goBack: () => void;
}

const AppStateContext = createContext<AppState>({
  map: defaultMap,
  zoomMapTo: noop,
  tab: Tab.Schedule,
  date: nothing(),
  goToTab: noop,
  goToScheduleTab: noop,
  goToDay: noop,
  goToFavoritesTab: noop,
  goToMapTab: noop,
  goBack: noop,
});

export const AppStateProvider = ({ children }: { children: ReactNode }) => {
  const [map, setMap] = useState(defaultMap);
  const [tab, setTab] = useState(Tab.Schedule);
  const [date, setDate] = useState(nothing<Date>());

  useEffect(() => {
    const load = () => {
      window.history.pushState(
        {
          tab: Tab.Schedule,
          map: defaultMap,
          date: undefined,
        },
        document.title,
      );
    };

    const setState = (state: unknown) => {
      if (isHistoryState(state)) {
        setMap(state.map);
        setTab(state.tab);
        setDate(state.date ? just(new Date(state.date)) : nothing());
      }
    };

    const popstate = (event: PopStateEvent) => {
      setState(event.state);
    };

    const rootElement = document.querySelector("#root") || undefined;
    const historyupdated = (event: HistoryUpdatedEvent) => {
      setState(event.detail);
    };

    window.addEventListener("load", load);
    window.addEventListener("popstate", popstate);
    rootElement?.addEventListener(historyEventName, historyupdated);

    return () => {
      window.removeEventListener("load", load);
      window.removeEventListener("popstate", popstate);
      rootElement?.removeEventListener(historyEventName, historyupdated);
    };
  }, []);

  const value = useMemo(
    () => ({
      map,
      tab,
      date,
      goToTab,
      goToScheduleTab: () => goToScheduleTab(),
      goToDay: (d: Date) => goToScheduleTab(d),
      goToFavoritesTab,
      goToMapTab: () => goToMapTab(),
      zoomMapTo: (center: Coordinates) => goToMapTab({ zoom: 18, center }),
      goBack,
    }),
    [map, tab, date],
  );

  return (
    <AppStateContext.Provider value={value}>
      {children}
    </AppStateContext.Provider>
  );
};

export const useAppState = (): AppState => useContext(AppStateContext);
