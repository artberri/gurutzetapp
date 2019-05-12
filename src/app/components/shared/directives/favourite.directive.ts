import { HostListener, Directive, Input, HostBinding, OnInit } from '@angular/core';
import { Event, IState, IStorage, INotifications } from '../../../domain';
import { FavouritePresenter } from './favourite.presenter';

@Directive({
  selector: '[appFavourite]'
})
export class FavouriteDirective implements OnInit {
  @Input('appFavourite')
  public event: Event | undefined;

  @HostBinding('attr.name')
  public elementClass: string = 'heart-empty';

  private readonly presenter: FavouritePresenter;

  constructor(
    state: IState,
    storage: IStorage,
    notifications: INotifications
  ) {
    this.presenter = new FavouritePresenter(state, storage, notifications);
  }

  public ngOnInit(): void {
    this.setClass();
  }

  @HostListener('click')
  public onClick(): void {
    if (this.event) {
      this.presenter.onClick(this.event);
      this.setClass();
    }
  }

  private setClass(): void {
    if (this.event) {
      this.elementClass = this.presenter.isFavourite(this.event) ? 'heart' : 'heart-empty';
    }
  }
}
