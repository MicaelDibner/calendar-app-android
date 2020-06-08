import { Component, OnInit, HostListener, NgZone } from '@angular/core';
import { Router } from '@angular/router';
import { Location } from '@angular/common';
import { SelectedDateService } from '../core/services/selected-date.service';
import { IDates } from '../core/model/IDates';
import { NgbDate, NgbDateStruct, NgbCalendarHebrew } from '@ng-bootstrap/ng-bootstrap';
import { DatePicker } from '@ionic-native/date-picker/ngx';
import { NotificationsService } from '../core/services/notifications.service';
import { INotification } from '../core/model/INotification';
import { StorageService } from '../core/services/storage.service';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.page.html',
  styleUrls: ['./menu.page.scss'],
  providers: [
    NgbCalendarHebrew,
    DatePicker
  ]
})
export class MenuPage implements OnInit {
  dates: IDates;
  myDate = new Date();
  hebrewDateModel: NgbDateStruct;

  constructor(private router: Router, private ngZone: NgZone, public location: Location,
              private selectedDateServise: SelectedDateService, private hebrewCalendar: NgbCalendarHebrew,
              private datePicker: DatePicker, private notifications: NotificationsService,
              private storageService: StorageService) { }

  ngOnInit() {
  }

  public navigate(commands: any[]): void {
    this.ngZone.run(() => this.router.navigate(commands)).then();
  }

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
  makeNotification() {
    const notification = {
      id: 1,
      title: 'custom notification',
      text: 'Delayed ILocalNotification',
      trigger: {at: new Date(new Date().getTime() + 3600)},
    } as INotification;
    this.notifications.createNotification(notification);
  }

  createEvent(){
    this.router.navigate(['menu/createEvent']);
  }

  convertDateToModel(date: any) {
    const model = new NgbDate(date.getUTCFullYear(), date.getUTCMonth() + 1, date.getUTCDate());
    this.emitDate(model);
  }

  selectToday() {
    this.myDate = new Date();
    this.convertDateToModel(this.myDate);
  }

  emitDate(model: NgbDate) {
    this.dates = {
      georgianDate: model,
      hebrewDate: this.hebrewCalendar.fromGregorian(model)
    };
    this.selectedDateServise.selectedDateSubscribtion.next(this.dates);
    this.location.back();
  }

  writeFile() {
    this.storageService.setFileInStorage();
  }

  readFile() {
    this.storageService.getFileFromStorage();
  }

  deleteDatabase() {
    this.storageService.removeDatabase();
  }

@HostListener('document:backbutton')
onMenu() {
    console.log('back pressed');
    this.location.back();
  }
@HostListener('document:keydown.r')
onQ() {
    console.log('back pressed');
    this.location.back();
  }
  @HostListener('document:keydown.enter')
onEnter() {
  console.log('menu enter pressed');
  }

}
