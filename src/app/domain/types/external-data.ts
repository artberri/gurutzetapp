import { Venue, EventDay } from '../entities';

export type ExternalData = {
    venues: Venue[];
    schedule: EventDay[];
};
