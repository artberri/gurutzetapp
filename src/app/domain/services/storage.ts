import { IScheduleState, IMapState, IFavouritesState } from '../state';
import { Language, ExternalData } from '../types';

export abstract class IStorage {
    public async abstract getLanguage(): Promise<Language | undefined>;
    public async abstract setLanguage(language: Language): Promise<Language>;
    public async abstract getExternalData(): Promise<ExternalData>;
    public async abstract setExternalData(externalData: ExternalData): Promise<ExternalData>;
    public async abstract getFavourites(): Promise<number[]>;
    public async abstract setFavourites(eventIds: number[]): Promise<number[]>;
}
