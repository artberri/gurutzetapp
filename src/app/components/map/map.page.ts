import { Component, AfterViewInit } from '@angular/core';
import {
  GoogleMaps,
  GoogleMap,
  GoogleMapOptions,
  Environment
} from '@ionic-native/google-maps';
import { IState, VenueCategory } from 'src/app/domain';
import { MapPresenter } from './map.presenter';

@Component({
  selector: 'app-map',
  templateUrl: 'map.page.html',
  styleUrls: ['map.page.scss']
})
export class MapPage implements AfterViewInit {
  public map: GoogleMap | undefined;

  private readonly presenter: MapPresenter;

  constructor(
    state: IState
  ) {
    this.presenter = new MapPresenter(state);
  }

  public ngAfterViewInit(): void {
    this.loadMap();
  }

  private loadMap(): void {

    // This code is necessary for browser
    Environment.setEnv({
      API_KEY_FOR_BROWSER_RELEASE: 'AIzaSyAe3jr2l5Fmo36u9R2lJ6ALgBzKTEmsBgM',
      API_KEY_FOR_BROWSER_DEBUG: 'AIzaSyAe3jr2l5Fmo36u9R2lJ6ALgBzKTEmsBgM'
    });

    const mapOptions: GoogleMapOptions = {
      camera: {
        target: {
          lat: 43.2815794,
          lng: -2.9856639
        },
        zoom: 18,
        tilt: 30
      }
    };

    this.map = GoogleMaps.create('map_canvas', mapOptions);
    this.loadMarkers();
  }

  private loadMarkers(): void {
    this.presenter.venues$.subscribe((venues) => {
      if (this.map) {
        this.map.clear();
        venues.forEach((venue) => {
          if (this.map) {
            this.map.addMarkerSync({
              title: venue.name,
              icon: this.getIcon(venue.category),
              animation: 'DROP',
              position: {
                lat: venue.latitude,
                lng: venue.longitude
              }
            });
          }
        });
      }
    });
  }

  private getIcon(category: VenueCategory): string {
    switch (category) {
      case VenueCategory.Business:
        return 'blue';
      case VenueCategory.Official:
        return 'red';
      default:
        return 'green';
    }
  }
}
