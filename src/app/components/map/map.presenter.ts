import { IState, Venue, VenueCategory } from '../../domain';
import { Observable } from 'rxjs';

export class MapPresenter {
    public readonly venues$: Observable<Venue[]>;

    constructor(
        private readonly state: IState
    ) {
        this.venues$ = this.state.venues$;
    }
}
