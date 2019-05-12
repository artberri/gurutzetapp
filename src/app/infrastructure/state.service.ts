import { Injectable, OnDestroy } from '@angular/core';
import { combineReducers, createStore, Store, Unsubscribe, AnyAction } from 'redux';
import {
  IAppState,
  favouritesReducer,
  mapReducer,
  scheduleReducer,
  setSchedule,
  EventDay,
  Event,
  setVenues,
  Venue,
  setFavourites,
  toggleFavourite
} from '../domain';
import { Observable, BehaviorSubject } from 'rxjs';
import { IState } from '../domain';
import { map } from 'rxjs/operators';

const rootReducer = combineReducers({
    schedule: scheduleReducer,
    favourites: favouritesReducer,
    map: mapReducer
});

const appStore = createStore(rootReducer);

@Injectable()
export class StateService implements OnDestroy, IState {

  public readonly onStateChanged$: Observable<IAppState>;
  public readonly schedule$: Observable<EventDay[]>;
  public readonly venues$: Observable<Venue[]>;
  public readonly favourites$: Observable<EventDay[]>;

  private readonly store: Store<IAppState, AnyAction>;
  private readonly onStateChangedSubject: BehaviorSubject<IAppState>;
  private readonly onStateChangedUnsubscriber: Unsubscribe;

  constructor() {
    this.store = appStore;
    this.onStateChangedSubject = new BehaviorSubject<IAppState>({
      schedule: {
        days: []
      },
      favourites: {
        eventIds: []
      },
      map: {
        venues: []
      }
    });
    this.onStateChangedUnsubscriber = this.store.subscribe(() => this.onStateChangedSubject.next(this.store.getState()));
    this.onStateChanged$ =  this.onStateChangedSubject;
    this.schedule$ = this.onStateChanged$.pipe(map((state) => state.schedule.days));
    this.venues$ = this.onStateChanged$.pipe(map((state) => state.map.venues));
    this.favourites$ = this.onStateChanged$.pipe(map((state) => {
      const favourites = state.favourites.eventIds;
      const days: EventDay[] = [];
      state.schedule.days.forEach((day) => {
        const dayEvents: Event[] = [];
        day.schedule.forEach((event) => {
          if (favourites.indexOf(event.id) >= 0) {
            dayEvents.push(event);
          }
        });
        if (dayEvents.length > 0) {
          days.push(new EventDay(day.title, day.description, dayEvents));
        }
      });

      return days;
    }));
  }

  public get schedule(): EventDay[] {
    return this.store.getState().schedule.days;
  }

  public get venues(): Venue[] {
    return this.store.getState().map.venues;
  }

  public get favourites(): number[] {
    return this.store.getState().favourites.eventIds;
  }

  public setSchedule(days: EventDay[]): void {
    this.store.dispatch(setSchedule(days));
  }

  public setVenues(venues: Venue[]): void {
    this.store.dispatch(setVenues(venues));
  }

  public setFavourites(eventIds: number[]): void {
    this.store.dispatch(setFavourites(eventIds));
  }

  public toggleFavourite(event: Event): void {
    this.store.dispatch(toggleFavourite(event));
  }

  public ngOnDestroy(): void {
    this.onStateChangedUnsubscriber();
  }
}
