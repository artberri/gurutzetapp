import { IState, EventDay, EventCategory } from '../../../domain';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

export class DayPresenter {
    public readonly schedule$: Observable<EventDay[]>;

    private filterCategory: EventCategory | undefined;

    constructor(
        private readonly state: IState
    ) {
        this.schedule$ = this.state.schedule$;
    }

    public setDay(dayIndex: number, filter: EventCategory | undefined): Observable<EventDay> {
        return this.schedule$.pipe(map(days => {
            const day = days[dayIndex];
            this.filterCategory = filter;

            if (this.filterCategory) {
                return new EventDay(day.title, day.description, day.schedule.filter(d => d.category === this.filterCategory));
            }

            return day;
        }));
    }

    public get filter(): EventCategory | undefined {
        return this.filterCategory;
    }
}
