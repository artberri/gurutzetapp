import { createContext, ReactNode, useContext, useMemo, useState } from "react";
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

export interface AppState {
  map: Map;
  zoomMapTo: (center: Coordinates) => void;
  setDefaultMap: () => void;
  tab: Tab;
  setTab: (tab: Tab) => void;
  goToScheduleTab: () => void;
  goToFavoritesTab: () => void;
  goToMapTab: () => void;
}

const defaultMap: Map = {
  center: [43.281_503_7, -2.987_221_7],
  zoom: 15,
};

const AppStateContext = createContext<AppState>({
  map: defaultMap,
  zoomMapTo: noop,
  setDefaultMap: noop,
  tab: Tab.Schedule,
  setTab: noop,
  goToScheduleTab: noop,
  goToFavoritesTab: noop,
  goToMapTab: noop,
});

export const useAppState = (): AppState => useContext(AppStateContext);

export const AppStateProvider = ({ children }: { children: ReactNode }) => {
  const [map, setMap] = useState(defaultMap);
  const [tab, setTab] = useState(Tab.Schedule);

  const value = useMemo(
    () => ({
      map,
      zoomMapTo: (center: Coordinates) => setMap({ zoom: 18, center }),
      setDefaultMap: () => setMap(defaultMap),
      tab,
      setTab,
      goToScheduleTab: () => setTab(Tab.Schedule),
      goToFavoritesTab: () => setTab(Tab.Favorites),
      goToMapTab: () => setTab(Tab.Map),
    }),
    [map, tab],
  );

  return (
    <AppStateContext.Provider value={value}>
      {children}
    </AppStateContext.Provider>
  );
};
