import { Component, ChangeDetectionStrategy } from '@angular/core';
import { EventDay, IState, EventCategory } from '../../../domain';
import { ActivatedRoute, ParamMap } from '@angular/router';
import { switchMap } from 'rxjs/operators';
import { Observable } from 'rxjs';
import { DayPresenter } from './day.presenter';

@Component({
  selector: 'app-day',
  templateUrl: 'day.page.html',
  styleUrls: ['day.page.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class DayPage {
  public day$: Observable<EventDay>;
  public EventCategory: typeof EventCategory = EventCategory;

  private readonly presenter: DayPresenter;
  private dayIndex: number = 0;
  private categoryNames: Map<EventCategory, string> = new Map<EventCategory, string>([
    [EventCategory.Children, 'CATEGORY_KIDS'],
    [EventCategory.Championship, 'CATEGORY_CHAMPIONSHIP'],
    [EventCategory.People, 'CATEGORY_PARTICIPATE'],
    [EventCategory.Restaurant, 'CATEGORY_GASTRONOMIC'],
    [EventCategory.Music, 'CATEGORY_MUSIC'],
    [EventCategory.Show, 'CATEGORY_SHOW'],
  ]);

  constructor(
    private readonly route: ActivatedRoute,
    state: IState
  ) {
    this.presenter = new DayPresenter(state);
    this.day$ = this.route.paramMap.pipe(
      switchMap((params: ParamMap) => {
        this.dayIndex = parseInt(params.get('id') + '', 10);
        return this.presenter.setDay(this.dayIndex, undefined);
      })
    );
  }

  public get category(): string | undefined {
    return this.presenter.filter ? this.categoryNames.get(this.presenter.filter) : undefined;
  }

  public setFilter($event: any): void {
    this.day$ = this.presenter.setDay(this.dayIndex, $event.detail.value);
  }
}
