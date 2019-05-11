import { Event } from '../../entities';

export const SET_FAVOURITES = 'SET_FAVOURITES';
export const TOGGLE_FAVOURITE = 'TOGGLE_FAVOURITE';

export interface IFavouritesState {
    eventIds: number[];
}

interface ISetFavouritesAction {
    type: typeof SET_FAVOURITES;
    eventIds: number[];
}

interface IToggleFavouriteAction {
    type: typeof TOGGLE_FAVOURITE;
    event: Event;
}

export type FavouritesActionTypes = ISetFavouritesAction | IToggleFavouriteAction;
