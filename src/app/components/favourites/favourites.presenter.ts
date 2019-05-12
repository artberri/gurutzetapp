import { IState, EventDay } from '../../domain';
import { Observable } from 'rxjs';

export class FavouritesPresenter {
    public readonly favourites$: Observable<EventDay[]>;

    constructor(
        private readonly state: IState
    ) {
        this.favourites$ = this.state.favourites$;
    }
}
