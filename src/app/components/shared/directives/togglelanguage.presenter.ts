import { ITranslator, IStorage, Language } from '../../../domain';

export class ToggleLanguagePresenter {
    constructor(
        private readonly translator: ITranslator,
        private readonly storage: IStorage
    ) {}

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
