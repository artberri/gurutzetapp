import { Observable } from 'rxjs';
import { IAppState } from '../state';
import { EventDay, Venue, Event } from '../entities';

export abstract class IState {
    public readonly abstract onStateChanged$: Observable<IAppState>;
    public readonly abstract schedule$: Observable<EventDay[]>;
    public readonly abstract favourites$: Observable<EventDay[]>;
    public readonly abstract venues$: Observable<Venue[]>;
    public abstract get schedule(): EventDay[];
    public abstract get venues(): Venue[];
    public abstract get favourites(): number[];
    public abstract setSchedule(days: EventDay[]): void;
    public abstract setVenues(venues: Venue[]): void;
    public abstract setFavourites(eventIds: number[]): void;
    public abstract toggleFavourite(event: Event): void;
}
