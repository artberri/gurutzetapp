import { HostListener, Directive } from '@angular/core';
import { ITranslator, IStorage, Language } from 'src/app/domain';

@Directive({
  selector: '[appToggleLanguage]'
})
export class ToggleLanguageDirective {
  constructor(
    private readonly translator: ITranslator,
    private readonly storage: IStorage
  ) {}

  @HostListener('click')
  public onClick(): void {
    const currentLang = this.translator.getCurrentLanguage();
    let newLang: Language = 'es';
    if (currentLang === 'es') {
      newLang = 'eu';
    }
    this.storage.setLanguage(newLang);
    this.translator.changeLanguage(newLang);
  }
}
