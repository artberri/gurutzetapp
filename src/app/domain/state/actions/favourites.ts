import { SET_FAVOURITES, TOGGLE_FAVOURITE, FavouritesActionTypes } from '../types';
import { Event } from '../../entities';

export function setFavourites(eventIds: number[]): FavouritesActionTypes {
  return {
    type: SET_FAVOURITES,
    eventIds
  };
}

export function toggleFavourite(event: Event): FavouritesActionTypes {
  return {
    type: TOGGLE_FAVOURITE,
    event
  };
}
