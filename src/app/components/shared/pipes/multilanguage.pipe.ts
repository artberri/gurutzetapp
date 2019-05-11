import { Pipe, PipeTransform, OnDestroy, ChangeDetectorRef } from '@angular/core';
import { MultilanguageText, ITranslator, Language } from '../../../domain';
import { Subscription } from 'rxjs';

@Pipe({
  name: 'appTranslate',
  pure: false
})
export class MultilanguagePipe implements PipeTransform, OnDestroy {
  private readonly languageChangedSubscription: Subscription;
  private cachedLanguage: Language;
  private cachedData: string | null = null;

  constructor(
    private readonly translator: ITranslator,
    cdr: ChangeDetectorRef
  ) {
    this.cachedLanguage = this.translator.getCurrentLanguage();
    this.languageChangedSubscription = this.translator.onLanguageChanged$
      .subscribe((newLang) => {
        this.cachedLanguage = newLang;
        cdr.detectChanges();
      });
  }

  public ngOnDestroy(): void {
    this.languageChangedSubscription.unsubscribe();
  }

  public transform(value: MultilanguageText): string {
    const currenLanguage = this.translator.getCurrentLanguage();
    if ((currenLanguage !== this.cachedLanguage) || this.cachedData === null) {
      this.cachedData = this.getText(value);
    }

    return this.cachedData + '';
  }

  private getText(value: MultilanguageText): string {
    if (this.translator.getCurrentLanguage() === 'eu') {
      return value.eu;
    }

    return value.es;
  }
}
