import { Component } from '@angular/core';

import { Platform } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';
import { IStorage, ITranslator, IState, IData } from '../domain';
import { AppPresenter } from './app.presenter';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html'
})
export class AppComponent {
  constructor(
    private readonly platform: Platform,
    private readonly splashScreen: SplashScreen,
    private readonly statusBar: StatusBar,
    storage: IStorage,
    translator: ITranslator,
    state: IState,
    data: IData
  ) {
    const presenter = new AppPresenter(state, storage, translator, data);
    presenter.onLoad();
    this.platform.ready().then(async () => {
      this.statusBar.styleDefault();
      await presenter.onPlatformReady();
      this.splashScreen.hide();
    });
  }
}
