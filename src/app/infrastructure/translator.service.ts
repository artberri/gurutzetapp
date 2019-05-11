import { Injectable } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { ITranslator, Language } from '../domain';
import { Observable, Subject } from 'rxjs';

@Injectable()
export class TranslatorService implements ITranslator {
  public readonly onLanguageChanged$: Observable<Language>;

  private readonly onLanguageChangedSubject: Subject<Language> = new Subject<Language>();

  constructor(private readonly translate: TranslateService) {
    this.onLanguageChanged$ =  this.onLanguageChangedSubject;
  }

  public getUserPreferedLanguage(): Language {
    const userLang = this.translate.getBrowserLang();
    return (/(es|eu)/gi.test(userLang) ? userLang : 'es') as 'eu' | 'es';
  }

  public changeLanguage(language: Language): void {
    this.translate.use(language);
    this.onLanguageChangedSubject.next(language);
  }

  public getCurrentLanguage(): Language {
    const userLang = this.translate.currentLang;
    return (/(es|eu)/gi.test(userLang) ? userLang : 'es') as 'eu' | 'es';
  }
}
