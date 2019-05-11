import { Component } from '@angular/core';
import { IState, EventDay } from '../../domain';
import { Observable } from 'rxjs';
import { SchedulePresenter } from './schedule.presenter';

@Component({
  selector: 'app-schedule',
  templateUrl: 'schedule.page.html',
  styleUrls: ['schedule.page.scss']
})
export class SchedulePage {
  public readonly schedule$: Observable<EventDay[]>;

  constructor(
    state: IState
  ) {
    const presenter = new SchedulePresenter(state);
    this.schedule$ = presenter.schedule$;
  }
}
