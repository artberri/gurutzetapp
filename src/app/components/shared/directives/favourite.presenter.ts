import { Event, IState, IStorage } from '../../../domain';

export class FavouritePresenter {
    constructor(
        private readonly state: IState,
        private readonly storage: IStorage
    ) {}

    public isFavourite(event: Event): boolean {
        return this.state.favourites.indexOf(event.id) >= 0;
    }

    public onClick(event: Event): void {
        this.state.toggleFavourite(event);
        this.storage.setFavourites(this.state.favourites);
    }
}
