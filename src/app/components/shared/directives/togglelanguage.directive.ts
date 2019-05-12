import { HostListener, Directive } from '@angular/core';
import { ITranslator, IStorage } from 'src/app/domain';
import { ToggleLanguagePresenter } from './togglelanguage.presenter';

@Directive({
  selector: '[appToggleLanguage]'
})
export class ToggleLanguageDirective {
  private readonly presenter: ToggleLanguagePresenter;

  constructor(
    translator: ITranslator,
    storage: IStorage
  ) {
    this.presenter = new ToggleLanguagePresenter(translator, storage);
  }

  @HostListener('click')
  public onClick(): void {
    this.presenter.onClick();
  }
}
