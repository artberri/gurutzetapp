import { FutureInstance } from "fluture";

import { Content } from "./Content";
import { ServiceGetter, ServiceGetterProvider } from "./utils/ServiceUtils";
import { OnlineStatusProvider } from "./utils/OnlineStatusUtils";
import { AppStateProvider } from "./utils/AppStateUtils";

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
