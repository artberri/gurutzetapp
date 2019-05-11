import { SET_SCHEDULE, IScheduleState, ScheduleActionTypes } from '../types';

const initialState: IScheduleState = {
  days: []
};

export function scheduleReducer(state: IScheduleState = initialState, action: ScheduleActionTypes): IScheduleState {
  switch (action.type) {
    case SET_SCHEDULE:
      return {
        days: action.days
      };
    default:
      return state;
  }
}
