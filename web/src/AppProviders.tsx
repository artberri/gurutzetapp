import { ReactNode } from "react";
import { ActivityProvider } from "./utils/ActivityUtils";
import { CategoryProvider } from "./utils/CategoryUtils";
import { FavoritesProvider } from "./utils/FavoriteUtils";
import { OnlineStatusProvider } from "./utils/OnlineStatusUtils";
import { VenueProvider } from "./utils/VenueUtils";

export const AppProviders = ({ children }: { children: ReactNode }) => (
  <OnlineStatusProvider>
    <FavoritesProvider>
      <ActivityProvider>
        <VenueProvider>
          <CategoryProvider>{children}</CategoryProvider>
        </VenueProvider>
      </ActivityProvider>
    </FavoritesProvider>
  </OnlineStatusProvider>
);
