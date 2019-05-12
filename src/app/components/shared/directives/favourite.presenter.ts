import { Event, IState, IStorage, INotifications } from '../../../domain';

export class FavouritePresenter {
    constructor(
        private readonly state: IState,
        private readonly storage: IStorage,
        private readonly notifications: INotifications,
    ) {}

    public isFavourite(event: Event): boolean {
        return this.state.favourites.indexOf(event.id) >= 0;
    }

    public onClick(event: Event): void {
        this.state.toggleFavourite(event);
        this.storage.setFavourites(this.state.favourites);
        if (this.isFavourite(event)) {
            this.notifications.schedule(event);
        } else {
            this.notifications.cancel(event);
        }
    }
}
