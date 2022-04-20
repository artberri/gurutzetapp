import { ReactNode } from "react";
import { ActivityProvider } from "./utils/ActivityUtils";
import { CategoryProvider } from "./utils/CategoryUtils";
import { FavoritesProvider } from "./utils/FavoriteUtils";
import { VenueProvider } from "./utils/VenueUtils";

export const AppProviders = ({ children }: { children: ReactNode }) => (
  <FavoritesProvider>
    <ActivityProvider>
      <VenueProvider>
        <CategoryProvider>{children}</CategoryProvider>
      </VenueProvider>
    </ActivityProvider>
  </FavoritesProvider>
);
