import { VenueCategory } from '../enums';

export class Venue {
    public static parseCollection(items: any[]): Venue[] {
        return items.map(i => Venue.parseItem(i));
    }

    public static parseItem(item: any): Venue {
        return new Venue(
            item.name,
            item.latitude,
            item.longitude,
            item.category,
        );
    }

    constructor(
        public name: string,
        public latitude: number,
        public longitude: number,
        public category: VenueCategory
    ) {}
}
