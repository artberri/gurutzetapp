import { SET_MAP_VENUES, MapActionTypes } from '../types';
import { Venue } from '../../entities';

export function setVenues(venues: Venue[]): MapActionTypes {
  return {
    type: SET_MAP_VENUES,
    venues
  };
}
