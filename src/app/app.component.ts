import { Component, HostListener, Inject } from '@angular/core';

import { Platform } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StorageService } from './core/services/storage.service';
import { Router } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
})
export class AppComponent {
  constructor(
    private platform: Platform,
    private splashScreen: SplashScreen,
    @Inject('Window') window: Window,
    private storageService: StorageService,
    private router: Router,
    private translate: TranslateService
  ) {
    this.initializeApp();
    console.log(window.innerHeight + ' ' + window.outerHeight + ' ' + window.innerWidth
    + ' ' + window.outerWidth);
  }


/**
 * 1) Receive state of platform from Ionic
 * 2) Download events from storageService
 * 3) Hide splashscreen
 */
  initializeApp() {
    this.platform.ready().then(() => {
    this.storageService.getEventsFromDB().then(() => {
      console.log('events downloaded');
      console.log(this.storageService.events);
      this.splashScreen.hide();
      this.router.navigate(['hebrewdatepicker']);
    }); });
    this.translate.setDefaultLang('en');
    this.translate.use('he');
  }
}
