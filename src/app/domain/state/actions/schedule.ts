import { SET_SCHEDULE, ScheduleActionTypes } from '../types';
import { EventDay } from '../../entities';

export function setSchedule(days: EventDay[]): ScheduleActionTypes {
  return {
    type: SET_SCHEDULE,
    days
  };
}
