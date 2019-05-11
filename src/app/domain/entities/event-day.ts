import { Event } from './event';
import { MultilanguageText } from '../types';

export class EventDay {
    public static parseCollection(items: any[]): EventDay[] {
        return items.map(i => EventDay.parseItem(i));
    }

    public static parseItem(item: any): EventDay {
        return new EventDay(
            item.title,
            item.description,
            Event.parseCollection(item.schedule)
        );
    }

    constructor(
        public title: MultilanguageText,
        public description: MultilanguageText,
        public schedule: Event[]
    ) {}
}
