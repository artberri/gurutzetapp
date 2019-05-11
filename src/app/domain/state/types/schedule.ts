import { EventDay } from '../../entities';

export const SET_SCHEDULE = 'SET_SCHEDULE';

export interface IScheduleState {
    days: EventDay[];
}

interface ISetScheduleAction {
    type: typeof SET_SCHEDULE;
    days: EventDay[];
}

export type ScheduleActionTypes = ISetScheduleAction;
