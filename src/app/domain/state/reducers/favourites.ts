import { SET_FAVOURITES, TOGGLE_FAVOURITE, FavouritesActionTypes, IFavouritesState } from '../types';

const initialState: IFavouritesState = {
  eventIds: []
};

export function favouritesReducer(state: IFavouritesState = initialState, action: FavouritesActionTypes): IFavouritesState {
  switch (action.type) {
    case SET_FAVOURITES:
      return {
        eventIds: action.eventIds
      };
    case TOGGLE_FAVOURITE:
      const eventIndex = state.eventIds.indexOf(action.event.id);

      if (eventIndex > -1) {
        return {
          eventIds: state.eventIds.slice(0, eventIndex).concat(state.eventIds.slice(eventIndex + 1))
        };
      }

      return {
        eventIds: state.eventIds.concat([action.event.id])
      };
    default:
      return state;
  }
}
