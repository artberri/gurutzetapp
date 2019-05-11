import { IState, EventDay } from '../../domain';
import { Observable } from 'rxjs';

export class SchedulePresenter {
    public readonly schedule$: Observable<EventDay[]>;

    constructor(
        private readonly state: IState
    ) {
        this.schedule$ = this.state.schedule$;
    }
}
