import { ReactNode } from "react";
import { ActivityProvider } from "./utils/ActivityUtils";
import { CategoryProvider } from "./utils/CategoryUtils";
import { FavoritesProvider } from "./utils/FavoriteUtils";
import { OnlineStatusProvider } from "./utils/OnlineStatusUtils";

export const AppProviders = ({ children }: { children: ReactNode }) => (
  <OnlineStatusProvider>
    <FavoritesProvider>
      <ActivityProvider>
        <CategoryProvider>{children}</CategoryProvider>
      </ActivityProvider>
    </FavoritesProvider>
  </OnlineStatusProvider>
);
