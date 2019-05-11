import { EventCategory } from '../enums';
import { MultilanguageText } from '../types';

export class Event {
    public static parseCollection(items: any[]): Event[] {
        return items.map(i => Event.parseItem(i));
    }

    public static parseItem(item: any): Event {
        return new Event(
            item.id,
            item.time,
            item.description,
            item.category,
        );
    }

    constructor(
        public id: number,
        public time: string,
        public description: MultilanguageText,
        public category: EventCategory
    ) {}
}
