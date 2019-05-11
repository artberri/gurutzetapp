import { IStorage, ITranslator, IState, IData, ExternalData } from '../domain';

export class AppPresenter {
    constructor(
        private readonly state: IState,
        private readonly storage: IStorage,
        private readonly translator: ITranslator,
        private readonly data: IData
    ) {}

    public onLoad(): void {
        this.setDefaultLanguage();
    }

    public async onPlatformReady(): Promise<void> {
        await this.setUserLanguage();
        await this.initializeState();
        await this.initializeExternalData();
    }

    private setDefaultLanguage(): void {
        const language = this.translator.getUserPreferedLanguage();
        this.translator.changeLanguage(language);
    }

    private async initializeState(): Promise<void> {
        const [externalData, favourites] = await Promise.all([
            this.storage.getExternalData(),
            this.storage.getFavourites()
        ]);

        this.state.setSchedule(externalData.schedule);
        this.state.setVenues(externalData.venues);
        this.state.setFavourites(favourites);
    }

    private async setUserLanguage(): Promise<void> {
        let language = await this.storage.getLanguage();
        if (!language) {
            language = this.translator.getUserPreferedLanguage();
            this.storage.setLanguage(language);
        }
        this.translator.changeLanguage(language);
    }

    private async initializeExternalData(): Promise<void> {
        const externalData = await this.data.retrieveData();
        if (externalData) {
            await this.setExternalDataToStateAndSave(externalData);
            return;
        }

        const savedExternalData = await this.storage.getExternalData();
        if (savedExternalData.schedule.length > 0) {
            this.setExternalDataToState(savedExternalData);
            return;
        }

        const localData = await this.data.retrieveDataLocally();
        if (localData) {
            await this.setExternalDataToStateAndSave(localData);
            return;
        }
    }

    private setExternalDataToState(externalData: ExternalData): void {
        this.state.setSchedule(externalData.schedule);
        this.state.setVenues(externalData.venues);
    }

    private async setExternalDataToStateAndSave(externalData: ExternalData): Promise<void> {
        this.setExternalDataToState(externalData);
        await this.storage.setExternalData(externalData);
    }
}
