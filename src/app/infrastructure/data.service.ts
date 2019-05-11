import { Injectable } from '@angular/core';
import { Network } from '@ionic-native/network/ngx';
import { HttpClient } from '@angular/common/http';
import { catchError } from 'rxjs/operators';
import { BehaviorSubject } from 'rxjs';
import { CONFIG_EXTERNAL_DATA_URL, CONFIG_LOCAL_DATA_URL } from '../config';
import { Venue, EventDay, ExternalData, IData } from '../domain';

interface IExternalDataViewModel {
  venues: object[];
  schedule: object[];
}

@Injectable()
export class DataService implements IData {
  constructor(
    private readonly network: Network,
    private readonly http: HttpClient
  ) {}

  public async retrieveData(): Promise<ExternalData | undefined> {
    if (this.isOnline) {
      return await this.retrieveDataFromUrl(CONFIG_EXTERNAL_DATA_URL);
    }
  }

  public async retrieveDataLocally(): Promise<ExternalData | undefined> {
    return await this.retrieveDataFromUrl(CONFIG_LOCAL_DATA_URL);
  }

  private async retrieveDataFromUrl(url: string): Promise<ExternalData | undefined> {
    return new Promise<ExternalData | undefined>((resolve) => {
      this.http.get<IExternalDataViewModel>(url).pipe(
        catchError(() => new BehaviorSubject(undefined))
      ).subscribe((body) => {
        if (body) {
          resolve({
            venues: Venue.parseCollection(body.venues),
            schedule: EventDay.parseCollection(body.schedule)
          });
        } else {
          resolve();
        }
      });
    });
  }

  private isOnline(): boolean {
    if (this.network && this.network.type === this.network.Connection.NONE) {
      return false;
    }

    return true;
  }
}
