import type { FutureInstance } from "fluture";

import { Content } from "./Content";
import { AppStateProvider } from "./utils/AppStateUtils";
import { OnlineStatusProvider } from "./utils/OnlineStatusUtils";
import {
	type ServiceGetter,
	ServiceGetterProvider,
} from "./utils/ServiceUtils";

export interface AppProperties {
	serviceGetter: ServiceGetter;
	getReady: FutureInstance<Error, void>;
}

export const App = ({ serviceGetter, getReady }: AppProperties) => (
	<ServiceGetterProvider serviceGetter={serviceGetter}>
		<OnlineStatusProvider>
			<AppStateProvider>
				<Content getReady={getReady} />
			</AppStateProvider>
		</OnlineStatusProvider>
	</ServiceGetterProvider>
);
