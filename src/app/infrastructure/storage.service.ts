import { Injectable } from '@angular/core';
import { Storage } from '@ionic/storage';
import { IStorage, Venue, EventDay, Language, ExternalData } from '../domain';

const LANGUAGE = 'language2019';
const MAP = 'map2019';
const SCHEDULE = 'schedule2019';
const FAVOURITES = 'favourites2019';

@Injectable()
export class StorageService implements IStorage {
  constructor(private readonly storage: Storage) { }

  public async getLanguage(): Promise<Language | undefined> {
    return await this.storage.get(LANGUAGE);
  }

  public async setLanguage(language: Language): Promise<Language> {
    return await this.storage.set(LANGUAGE, language);
  }

  public async getExternalData(): Promise<ExternalData> {
    const venueObjectsString = await this.storage.get(MAP) || '[]';
    const dayObjectsString = await this.storage.get(SCHEDULE) || '[]';
    const venueObjects = JSON.parse(venueObjectsString);
    const dayObjects = JSON.parse(dayObjectsString);
    return {
      venues: Venue.parseCollection(venueObjects),
      schedule: EventDay.parseCollection(dayObjects)
    };
  }

  public async setExternalData(externalData: ExternalData): Promise<ExternalData> {
    const venueObjects = await this.storage.set(MAP, JSON.stringify(externalData.venues)) || [];
    const dayObjects = await this.storage.set(SCHEDULE, JSON.stringify(externalData.schedule)) || [];
    return {
      venues: Venue.parseCollection(JSON.parse(venueObjects)),
      schedule: EventDay.parseCollection(JSON.parse(dayObjects))
    };
  }

  public async getFavourites(): Promise<number[]> {
    const favouritesString = await this.storage.get(FAVOURITES) || '[]';
    return JSON.parse(favouritesString);
  }

  public async setFavourites(eventIds: number[]): Promise<number[]> {
    return await this.storage.set(FAVOURITES, JSON.stringify(eventIds));
  }
}
