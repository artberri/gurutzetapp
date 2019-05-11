import { Venue } from '../../entities';

export const SET_MAP_VENUES = 'SET_MAP_VENUES';

export interface IMapState {
    venues: Venue[];
}

interface ISetMapVenuesAction {
    type: typeof SET_MAP_VENUES;
    venues: Venue[];
}

export type MapActionTypes = ISetMapVenuesAction;
