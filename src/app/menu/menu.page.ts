import { Component, OnInit, HostListener, NgZone, Renderer2 } from '@angular/core';
import { Router } from '@angular/router';
import { Location } from '@angular/common';
import { SelectedDateService } from '../core/services/selected-date.service';
import { IDates } from '../core/model/IDates';
import { NgbDate, NgbDateStruct, NgbCalendarHebrew } from '@ng-bootstrap/ng-bootstrap';
import { DatePicker } from '@ionic-native/date-picker/ngx';
import { NotificationsService } from '../core/services/notifications.service';
import { INotification } from '../core/model/INotification';
import { StorageService } from '../core/services/storage.service';
import { TranslateService } from '@ngx-translate/core';
import { NavController } from '@ionic/angular';

/**
 * Page provide menuModule with children routes
 */

@Component({
  selector: 'app-menu',
  templateUrl: './menu.page.html',
  styleUrls: ['./menu.page.scss'],
  providers: [
    NgbCalendarHebrew,
    DatePicker
  ]
})
export class MenuPage {
  dates: IDates;
  myDate = new Date();
  hebrewDateModel: NgbDateStruct;

  private buttonBackHandler;
  private buttonMenuHandler;
  private buttonRHandler;
  private buttonQHandler;

  constructor(private selectedDateServise: SelectedDateService, private hebrewCalendar: NgbCalendarHebrew,
              private datePicker: DatePicker, private notifications: NotificationsService,
              private navCntrl: NavController, private renderer: Renderer2) {
              }

  ionViewWillEnter(): void{
    this.buttonBackHandler = this.renderer.listen('document', 'backbutton', () => this.onMenu());
    this.buttonMenuHandler = this.renderer.listen('document', 'menubutton', () => this.onBack());
    this.buttonRHandler = this.renderer.listen('document', 'keydown.r', () => this.onMenu());
    this.buttonQHandler = this.renderer.listen('document', 'keydown.q', () => this.onBack());
  }

  ionViewWillLeave(): void{
    this.buttonBackHandler();
    this.buttonMenuHandler();
    this.buttonRHandler();
    this.buttonQHandler();
  }

  onMenu() {
    console.log('back menu pressed');
    this.navCntrl.pop();
  }

  onBack() {
    console.log('menu pressed');
  }

/**
 * Method calls native android datepicker for date
 */

  selectADate(){
  this.datePicker.show({
    date: new Date(),
    mode: 'date',
    androidTheme: this.datePicker.ANDROID_THEMES.THEME_DEVICE_DEFAULT_LIGHT
  }).then(
    date => this.convertDateToModel(date),
    err => console.log('Error occurred while getting date: ', err)
  );
  }

/**
 * Method calls native android notification and create test notification
 */

  makeNotification() {
    const notification = {
      id: 1,
      title: 'custom notification',
      text: 'Delayed ILocalNotification',
      trigger: {at: new Date(new Date().getTime() + 3600)},
    } as INotification;
    this.notifications.createNotification(notification);
  }

/**
 * Open CreateEventComponent
 */
  createEvent(){
    this.navCntrl.navigateForward('menu/createEvent');
  }

/**
 * Method conver JS Date to NgbDate format for SelectedDateService
 */

  convertDateToModel(date: any) {
    const model = new NgbDate(date.getUTCFullYear(), date.getUTCMonth() + 1, date.getUTCDate());
    this.emitDate(model);
  }

/**
 * Method emit Date.now() to SelectedDateService
 */

  selectToday() {
    this.myDate = new Date();
    this.convertDateToModel(this.myDate);
  }

/**
 * Method emit NgbDate to SelectedDateService
 */

  emitDate(model: NgbDate) {
    this.dates = {
      georgianDate: model,
      hebrewDate: this.hebrewCalendar.fromGregorian(model)
    };
    this.selectedDateServise.selectedDateSubscribtion.next(this.dates);
    this.navCntrl.pop();
  }

  openSettings(){
    this.navCntrl.navigateForward('menu/settings');
  }

}
