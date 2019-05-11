import { Language } from '../types';
import { Observable } from 'rxjs';

export abstract class ITranslator {
    public readonly abstract onLanguageChanged$: Observable<Language>;
    public abstract getUserPreferedLanguage(): Language;
    public abstract changeLanguage(language: Language): void;
    public abstract getCurrentLanguage(): Language;
}
