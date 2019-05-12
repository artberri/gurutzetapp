import { Component } from '@angular/core';
import { Observable } from 'rxjs';
import { EventDay, IState } from '../../domain';
import { FavouritesPresenter } from './favourites.presenter';

@Component({
  selector: 'app-favourites',
  templateUrl: 'favourites.page.html',
  styleUrls: ['favourites.page.scss']
})
export class FavouritesPage {
  public readonly favourites$: Observable<EventDay[]>;

  constructor(
    state: IState
  ) {
    const presenter = new FavouritesPresenter(state);
    this.favourites$ = presenter.favourites$;
  }
}
