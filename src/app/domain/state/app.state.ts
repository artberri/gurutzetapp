import { IFavouritesState, IScheduleState, IMapState } from './types';

export interface IAppState {
    schedule: IScheduleState;
    favourites: IFavouritesState;
    map: IMapState;
}
