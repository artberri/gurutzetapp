import { Event } from '../entities';

export abstract class INotifications {
    public abstract schedule(event: Event): void;
    public abstract cancel(event: Event): void;
}
