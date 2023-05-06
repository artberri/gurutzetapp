import { SignalSlashIcon } from "@heroicons/react/24/outline"
import { useTranslation } from "react-i18next"
import { useOnlineStatus } from "../utils/OnlineStatusUtils"
import { VenuesMap } from "./VenuesMap"
import { Warning } from "./Warning"

export const Map = () => {
	const isOnline = useOnlineStatus()
	const { t } = useTranslation()

	return isOnline ? (
		<div className="flex justify-center items-center w-full h-full">
			<VenuesMap />
		</div>
	) : (
		<Warning>
			<div>
				<SignalSlashIcon className="w-14" />
			</div>
			<div>{t("map.offline")}</div>
		</Warning>
	)
}
