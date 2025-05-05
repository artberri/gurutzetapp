import { SignalSlashIcon } from "@heroicons/react/24/outline";
import { Suspense, lazy } from "react";
import { useTranslation } from "react-i18next";
import { useOnlineStatus } from "../utils/OnlineStatusUtils";
import { Loader } from "./Loader";
import { Warning } from "./Warning";

const LazyVenuesMap = lazy(() =>
	import("./VenuesMap").then((module) => ({ default: module.VenuesMap })),
);

export const MapComponent = () => {
	const isOnline = useOnlineStatus();
	const { t } = useTranslation();

	return isOnline ? (
		<div className="flex justify-center items-center w-full h-full">
			<Suspense fallback={<Loader />}>
				<LazyVenuesMap />
			</Suspense>
		</div>
	) : (
		<Warning>
			<div>
				<SignalSlashIcon className="w-14" />
			</div>
			<div>{t("map.offline")}</div>
		</Warning>
	);
};
