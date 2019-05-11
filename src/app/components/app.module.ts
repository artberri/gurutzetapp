import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouteReuseStrategy } from '@angular/router';
import { HttpClientModule, HttpClient } from '@angular/common/http';
import { TranslateModule, TranslateLoader} from '@ngx-translate/core';

import { IonicModule, IonicRouteStrategy } from '@ionic/angular';
import { IonicStorageModule } from '@ionic/storage';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { httpTranslateLoaderFactory, StorageService, TranslatorService, StateService, DataService } from '../infrastructure';
import { IStorage, ITranslator, IState, IData } from '../domain';
import { Network } from '@ionic-native/network/ngx';
import { SharedModule } from './shared/shared.module';

@NgModule({
  declarations: [AppComponent],
  entryComponents: [],
  imports: [
    BrowserModule,
    IonicModule.forRoot(),
    AppRoutingModule,
    HttpClientModule,
    IonicStorageModule.forRoot(),
    TranslateModule.forRoot({
        loader: {
            provide: TranslateLoader,
            useFactory: httpTranslateLoaderFactory,
            deps: [HttpClient]
        }
    }),
    SharedModule
  ],
  providers: [
    Network,
    StatusBar,
    SplashScreen,
    { provide: RouteReuseStrategy, useClass: IonicRouteStrategy },
    { provide: IStorage, useClass: StorageService },
    { provide: IState, useClass: StateService },
    { provide: ITranslator, useClass: TranslatorService },
    { provide: IData, useClass: DataService }
  ],
  bootstrap: [AppComponent]
})
export class AppModule {}
