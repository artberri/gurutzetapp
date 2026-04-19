import {
	type ReactNode,
	createContext,
	useContext,
	useEffect,
	useMemo,
	useState,
} from "react";
import { type Maybe, just, nothing } from "../cross-cutting/Maybe";
import { noop } from "../cross-cutting/Noop";

export const Tab = {
	Favorites: 1,
	Map: 2,
	Schedule: 0,
} as const;
export type Tab = (typeof Tab)[keyof typeof Tab];

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
	const rootElement = document.querySelector("#root") ?? undefined;
	globalThis.history.pushState(
		{
			date: historyState.date ? historyState.date.toISOString() : undefined,
			map: historyState.map,
			tab: historyState.tab,
		},
		document.title,
	);
	rootElement?.dispatchEvent(
		new CustomEvent(historyEventName, { detail: historyState }),
	);
};

const goBack = () => globalThis.history.go(-1);
const goToTab = (tab: Tab, options: { map?: Map; date?: Date } = {}) => {
	const { map, date } = options;
	pushState({
		date,
		map: map ?? defaultMap,
		tab,
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
	date: nothing(),
	goBack: noop,
	goToDay: noop,
	goToFavoritesTab: noop,
	goToMapTab: noop,
	goToScheduleTab: noop,
	goToTab: noop,
	map: defaultMap,
	tab: Tab.Schedule,
	zoomMapTo: noop,
});

export const AppStateProvider = ({ children }: { children: ReactNode }) => {
	const [map, setMap] = useState(defaultMap);
	const [tab, setTab] = useState<Tab>(Tab.Schedule);
	const [date, setDate] = useState(nothing<Date>());

	useEffect(() => {
		const load = () => {
			globalThis.history.pushState(
				{
					date: undefined,
					map: defaultMap,
					tab: Tab.Schedule,
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

		const rootElement = document.querySelector("#root") ?? undefined;
		const historyupdated = (event: HistoryUpdatedEvent) => {
			setState(event.detail);
		};

		window.addEventListener("load", load);
		globalThis.addEventListener("popstate", popstate);
		rootElement?.addEventListener(historyEventName, historyupdated);

		return () => {
			window.removeEventListener("load", load);
			globalThis.removeEventListener("popstate", popstate);
			rootElement?.removeEventListener(historyEventName, historyupdated);
		};
	}, []);

	const value = useMemo(
		() => ({
			date,
			goBack,
			goToDay: (d: Date) => goToScheduleTab(d),
			goToFavoritesTab,
			goToMapTab: () => goToMapTab(),
			goToScheduleTab: () => goToScheduleTab(),
			goToTab,
			map,
			tab,
			zoomMapTo: (center: Coordinates) => goToMapTab({ center, zoom: 18 }),
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
