import { SET_MAP_VENUES, IMapState, MapActionTypes } from '../types';

const initialState: IMapState = {
  venues: []
};

export function mapReducer(state: IMapState = initialState, action: MapActionTypes): IMapState {
  switch (action.type) {
    case SET_MAP_VENUES:
      return {
        venues: action.venues
      };
    default:
      return state;
  }
}
