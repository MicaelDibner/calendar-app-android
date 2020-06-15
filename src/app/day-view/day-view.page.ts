import { Component, OnInit, HostListener, NgZone } from '@angular/core';
import { IDates } from '../core/model/IDates';
import { NgbDateStruct } from '@ng-bootstrap/ng-bootstrap/datepicker/ngb-date-struct';
import { SelectedDateService } from '../core/services/selected-date.service';
import { NgbDatepickerI18nHebrew } from '@ng-bootstrap/ng-bootstrap';
import { NavController } from '@ionic/angular';
import { StorageService } from '../core/services/storage.service';
import { IEvent } from '../core/model/IEvent';
import { DatePipe } from '@angular/common';
import { Parsha, ZmanimCalendar, GeoLocation } from 'kosher-zmanim';
import { IDayInfoModel} from '../core/model/IDayInfoModel';
import { IDayViewNotifications } from '../core/model/IDayViewNotifications';
import { INotification } from '../core/model/INotification';
import { EventsService } from '../core/services/events.service';
import { INewNotification } from '../core/model/INewNotification';
import { NotificationsService } from '../core/services/notifications.service';
import { IDayViewNewNotifications } from '../core/model/IDayViewNewNotifications';

/**
 * Page for Day View with custom dayTemplateData
 * General structure - receiving all events for day from storage
 * Receiving dayInfo from Datepicker (calculated in datepicker)
 * Creating separate array only for user
 * If user added new notifications - add new notifications in StorageService and android
 */

@Component({
  selector: 'app-day-view',
  templateUrl: './day-view.page.html',
  styleUrls: ['./day-view.page.scss'],
  providers: [NgbDatepickerI18nHebrew, DatePipe]
})
export class DayViewPage implements OnInit {
  // model from SelectedDateService (contains model and hebrewDateModel)
  dates: IDates;
  model: NgbDateStruct;
  dayInfo: IDayInfoModel;
  hebrewDateModel: NgbDateStruct;
  // all events (user events and holyday events) from EventsService
  events: IEvent[];
  userEvents: IEvent[];
  ZmanimCalendar = new ZmanimCalendar();
  // array for exist notifications, added in day view
  daynotifications: IDayViewNotifications = {
      yomtov: [] as INotification[],
      holyday: [] as INotification[],
      omer: [] as INotification[],
      chanukah: [] as INotification[],
      roshhodesh: [] as INotification[],
      taanis: [] as INotification[],
      kidushLevana: [] as INotification[],
      parasha: [] as INotification[],
      specialParasha: [] as INotification[],
      shabbatMevorachim: [] as INotification[],
      aseresYomei: [] as INotification[],
      isYomShishi: [] as INotification[],
      isShabbat: [] as INotification[]
  };
  // array for new notifications, added in day view
  newnotifications: IDayViewNewNotifications = {
    yomtov: [] as INewNotification[],
    holyday: [] as INewNotification[],
    omer: [] as INewNotification[],
    chanukah: [] as INewNotification[],
    roshhodesh: [] as INewNotification[],
    taanis: [] as INewNotification[],
    kidushLevana: [] as INewNotification[],
    parasha: [] as INewNotification[],
    specialParasha: [] as INewNotification[],
    shabbatMevorachim: [] as INewNotification[],
    aseresYomei: [] as INewNotification[],
    isYomShishi: [] as INewNotification[],
    isShabbat: [] as INewNotification[]
};
  // array for new notifications for user events (ine array for all user events)
  newUserNotifications: INewNotification[] = [];

  hagim = {
    0: 'EREV_PESACH',
    1: 'PESACH',
    2: 'CHOL_HAMOED_PESACH',
    3: 'PESACH_SHENI',
    4: 'EREV_SHAVUOS',
    5: 'SHAVUOS',
    6: 'SEVENTEEN_OF_TAMMUZ',
    7: 'TISHA_BEAV',
    8: 'TU_BEAV',
    9: 'EREV_ROSH_HASHANA',
    10: 'ROSH_HASHANA',
    11: 'FAST_OF_GEDALYAH',
    12: 'EREV_YOM_KIPPUR',
    13: 'YOM_KIPPUR',
    14: 'EREV_SUCCOS',
    15: 'SUCCOS',
    16: 'CHOL_HAMOED_SUCCOS',
    17: 'HOSHANA_RABBA',
    18: 'SHEMINI_ATZERES',
    19: 'SIMCHAS_TORAH',
    21: 'CHANUKAH',
    22: 'TENTH_OF_TEVES',
    23: 'TU_BESHVAT',
    24: 'FAST_OF_ESTHER',
    25: 'PURIM',
    26: 'SHUSHAN_PURIM',
    27: 'PURIM_KATAN',
    28: 'ROSH_CHODESH',
    29: 'YOM_HASHOAH',
    30: 'YOM_HAZIKARON',
    31: 'YOM_HAATZMAUT',
    32: 'YOM_YERUSHALAYIM'
  };
  notificationsView = {
    yomtov: true,
    holyday: true,
    omer: true,
    chanukah: true,
    roshhodesh: true,
    taanis: true,
    kidushLevana: true,
    parasha: true,
    specialParasha: true,
    shabbatMevorachim: true,
    aseresYomei: true,
    isYomShishi: true,
    isShabbat: true };

  notificationsButtonView = {
      yomtov: false,
      holyday: false,
      omer: false,
      chanukah: false,
      roshhodesh: false,
      taanis: false,
      kidushLevana: false,
      parasha: false,
      specialParasha: false,
      shabbatMevorachim: false,
      aseresYomei: false,
      isYomShishi: false,
      isShabbat: false };

  // types of holyday
  notificationsNameArr = [
      'yomtov',
      'holyday',
      'omer',
      'chanukah',
      'roshhodesh',
      'taanis',
      'kidushLevana',
      'parasha',
      'specialParasha',
      'shabbatMevorachim',
      'aseresYomei',
      'isYomShishi',
      'isShabbat'];

  constructor(private selectedDateServise: SelectedDateService,
              private storageService: StorageService,
              public i18n: NgbDatepickerI18nHebrew,
              public navCtrl: NavController,
              private eventsService: EventsService,
              private notificationsService: NotificationsService,
              public datePipe: DatePipe,
              ) { }

/**
 * Refresh model dates and day info
 * getting date model if model was emitted to SelectedDateServise
 * getting all events for date (user and not user)
 */

  ngOnInit(): void {
    this.getDataString();
    this.dayInfo = this.selectedDateServise.selectedDateDayInfoSubscribtion.getValue();
    console.log(this.dayInfo);
    this.getEvents();
    const geoLocation: GeoLocation = new GeoLocation('Jerusalem' , 31.76832, 35.21371,
    779.46, 'Asia/Jerusalem');
    this.ZmanimCalendar.setGeoLocation(geoLocation);
    console.log(this.daynotifications);
  }

/**
 * Refresh model dates and day info
 */

  ionViewWillEnter(): void{
    this.getDataString();
    this.getEvents();
    this.dayInfo = this.selectedDateServise.selectedDateDayInfoSubscribtion.getValue();
    this.fillNotifications();
  }

  ionViewWillLeave(): void{
    this.emitNotificationsAndEvents();
  }

/**
 * Clearing component objects
 */

  clearData() {
    this.daynotifications = {
      yomtov: [] as INotification[],
      holyday: [] as INotification[],
      omer: [] as INotification[],
      chanukah: [] as INotification[],
      roshhodesh: [] as INotification[],
      taanis: [] as INotification[],
      kidushLevana: [] as INotification[],
      parasha: [] as INotification[],
      specialParasha: [] as INotification[],
      shabbatMevorachim: [] as INotification[],
      aseresYomei: [] as INotification[],
      isYomShishi: [] as INotification[],
      isShabbat: [] as INotification[]
  };
    this.newnotifications = {
      yomtov: [] as INewNotification[],
      holyday: [] as INewNotification[],
      omer: [] as INewNotification[],
      chanukah: [] as INewNotification[],
      roshhodesh: [] as INewNotification[],
      taanis: [] as INewNotification[],
      kidushLevana: [] as INewNotification[],
      parasha: [] as INewNotification[],
      specialParasha: [] as INewNotification[],
      shabbatMevorachim: [] as INewNotification[],
      aseresYomei: [] as INewNotification[],
      isYomShishi: [] as INewNotification[],
      isShabbat: [] as INewNotification[]
};
  }

/**
 * Filling arrays for exist notifications for events
 */

  fillNotifications() {
    if (this.events !== undefined) {
    this.daynotifications = {
    yomtov: this.getNotificationsForHolyday('yomtov'),
    holyday: this.getNotificationsForHolyday('holyday'),
    omer: this.getNotificationsForHolyday('omer'),
    chanukah: this.getNotificationsForHolyday('chanukah'),
    roshhodesh: this.getNotificationsForHolyday('roshhodesh'),
    taanis: this.getNotificationsForHolyday('taanis'),
    kidushLevana: this.getNotificationsForHolyday('kidushLevana'),
    parasha: this.getNotificationsForHolyday('parasha'),
    specialParasha: this.getNotificationsForHolyday('specialParasha'),
    shabbatMevorachim: this.getNotificationsForHolyday('shabbatMevorachim'),
    aseresYomei: this.getNotificationsForHolyday('aseresYomei'),
    isYomShishi: this.getNotificationsForHolyday('isYomShishi'),
    isShabbat: this.getNotificationsForHolyday('isShabbat'),
  }; }
}

/**
 * Method that fill notifications for all not user events in the day
 * holydayName from this.notificationsNameArr
 */
  getNotificationsForHolyday(holydayName: string): INotification[] {
    const notificationsArray: INotification[] = new Array();
    this.events.forEach(value => {
      if (value.title === holydayName && value.isUserEvent === false) {
        notificationsArray.push(...value.notifications);
      }
    });
    console.log('exist notifications array for ' + holydayName);
    console.log(notificationsArray);
    if (notificationsArray.length > 0) {
      return notificationsArray;
    } else { return null; }
  }

/**
 * Add one new notification from view to special array of holyday
 */

  createNotification(notification: INewNotification, arr: INewNotification[], state: boolean) {
    arr.push(notification);
    state = !state;
  }

/**
 * Add one new notification from view to new user notifications array
 */

  createUserNotification(notification: INewNotification, arr: INewNotification[], event: IEvent) {
    notification.date = event.date;
    notification.title = event.title;
    arr.push(notification);
    event.isNotificationsCollapsed = !event.isNotificationsCollapsed;
  }

/**
 * Method that start when calls this.ionViewWillLeave()
 * part 1 = creating INotification from all INewNotification 's in this.newnotifications
 * part 2 = send iNotification[] to notificationsService (add notifications to Android)
 * part 2.1 = generateUserNotifications for this.userEvents (if user added new notifications for user events)
 * part 3 =full rewrite day data in StorageService -> IonicStorage
 */

  emitNotificationsAndEvents() {
    console.log(this.newnotifications);
    console.log('check notifications');
    let settedDate = new Date(this.ZmanimCalendar.getSunset().ts);
    console.log(settedDate);
    // part 1 = creating INotification from all INewNotification 's in this.newnotifications
    this.notificationsNameArr.forEach(value => {
      if (this.newnotifications[value].length !== 0) {
        console.warn(value + ' new notifications ' + this.newnotifications[value].length);
        switch (value){
          case 'roshhodesh':
            settedDate = this.dayInfo.molad;
            break;
          case 'kidushLevana':
            settedDate = this.dayInfo.molad;
            break;
          case 'isYomShishi':
            settedDate = this.ZmanimCalendar.getCandleLighting().ts;
            break;
          default:
            break;
        }
        // part 2 = send iNotification[] to notificationsService (add notifications to Android)
        this.generateNotifications(value, settedDate);
        } else  { console.log('no new events for: ' + value); }
    });
    if (this.newUserNotifications.length > 0) {
      // part 2.1 = generateUserNotifications for this.userEvents
      this.generateUserNotifications(this.newUserNotifications);
    } else  { console.log('no new events for user'); }
    // part 3 =full rewrite day data in StorageService -> IonicStorage with new notifications in events in the day
    this.storageService.setEventsForDate((this.model.year + '-' + this.model.month + '-' + this.model.day), this.events);
    this.clearData();
  }


/**
 * Method generate notifications for NOT user events from view type INewNotification to type INotification that suitable for android
 * new notifications from this.newnotifications
 */

  generateNotifications(typename: string, settedDate: Date) {
      console.log('create notifications for:' + typename);
      const eventNotifications = new Array();
      this.newnotifications[typename].forEach(value => {
      const notificationDate = new Date(settedDate);
      switch (value.unitsType) {
        case 'Minutes before':
          notificationDate.setMinutes(notificationDate.getMinutes() - value.unitsBefore);
          break;
        case 'Hours before':
          notificationDate.setHours(notificationDate.getHours() - value.unitsBefore);
          break;
        case 'Days before':
          notificationDate.setDate(notificationDate.getDate() - value.unitsBefore);
          break;
        case 'Months before':
          notificationDate.setMonth(notificationDate.getMonth() - value.unitsBefore);
          break;
        default:
          console.error('Wrong data!');
          break;
      }

      const notification = {
      id: this.notificationsService.getNotificationId(this.datePipe.transform(settedDate, 'yyyyMddHHmm')),
      title: 'Event on: ' + this.datePipe.transform(settedDate, 'yyyy-M-dd HH:mm'),
      text: value.unitsBefore + ' ' + value.unitsType + ' ' + this.generateNotificationName(typename),
      trigger: {at: notificationDate},
      unitsBefore: value.unitsBefore,
      unitsType: value.unitsType
      } as INotification;
      eventNotifications.push(notification);

      console.log('All ' + typename + 'new generated notifications: ');
      console.log(eventNotifications);
      });
      if (this.events !== undefined){ 
        // if holyday events have notifications and have event with name of holyday in the database
        this.addNotificationsToExistEvents(typename, settedDate, eventNotifications);
      } else {
        // if holyday events not have notifications added before
        this.createEventForNotifications(typename, settedDate, eventNotifications); }
      // adding notifications to android system
      this.notificationsService.createNotifications(eventNotifications);
  }

/**
 * Method put name of holyday to notification text
 */

  public generateNotificationName(typename: string): string {
    console.warn(typename);
    let result;
    const holydayNames = ['holyday', 'yomtov', 'taanis'];
    holydayNames.forEach(value => {
      const res = value.localeCompare(typename);
      if (res === 0) {
        result = this.hagim[this.dayInfo.holydayNumber];
      } else { console.warn(typename); result = typename; }
    });
    return result;
  }

/**
 * Method generate notifications for user events from view type INewNotification to type INotification that suitable for android
 * new notifications from  this.newUserNotifications
 */

  generateUserNotifications(newUserNotifications: INewNotification[]) {
    const eventNotifications = new Array();
    this.newUserNotifications.forEach((value, index) => {
      const notificationDate = new Date(newUserNotifications[index].date);
      switch (value.unitsType) {
        case 'Minutes before':
          notificationDate.setMinutes(notificationDate.getMinutes() - value.unitsBefore);
          break;
        case 'Hours before':
          notificationDate.setHours(notificationDate.getHours() - value.unitsBefore);
          break;
        case 'Days before':
          notificationDate.setDate(notificationDate.getDate() - value.unitsBefore);
          break;
        case 'Months before':
          notificationDate.setMonth(notificationDate.getMonth() - value.unitsBefore);
          break;
        default:
          console.error('Wrong data!');
          break;
      }

      const notification = {
      id: this.notificationsService.getNotificationId(this.datePipe.transform(newUserNotifications[index].date, 'yyyyMddHHmm')),
      title: 'Event on: ' + this.datePipe.transform(newUserNotifications[index].date, 'yyyy-M-dd HH:mm'),
      text: value.unitsBefore + ' ' + value.unitsType + ' ' + newUserNotifications[index].title,
      trigger: {at: notificationDate},
      unitsBefore: value.unitsBefore,
      unitsType: value.unitsType
      } as INotification;
      eventNotifications.push(notification);
      this.events.forEach((value) => {
        if (value.date === newUserNotifications[index].date) {
          value.notifications.push(notification);
        }
      });
    });
    console.log('All user new generated notifications: ');
    console.log(eventNotifications);
    this.notificationsService.createNotifications(eventNotifications);
    }

/**
 * Method add notifications if day have events. If day not have event with holyday name >
 * method will generate new event with title of hollyday name
 */

  addNotificationsToExistEvents(typename: string, settedDate: Date, eventNotifications: INotification[]) {
    console.warn('step 3 update notifications for: ' + typename);
    let indexArr;
    let event;
    this.events.forEach((value, index) => {
      // check if event with title=typename exist in this.events
      if (this.checkIfHolydayEventExist(typename, value)) {
        indexArr = index;
        event = value;
      }
    });
    if (event !== undefined) {
      console.warn('step 4 adding notifications for: ' + typename);
      this.events[indexArr].notifications.push(...eventNotifications);
    } else {
        // if event with title=typename not exist will create new event in this.events
        console.warn('step 4 creating new event for: ' + typename);
        const event = {
          date: settedDate,
          isUserEvent: false,
          title: typename,
          // text: this.eventForm.value['description'],
          notifications: eventNotifications,
          color: 'none'
        } as IEvent;
        this.events.push(event);
        console.log('created event:');
        console.log(event);
      }
    }

  // check if event with title=typename exist in this.events

  checkIfHolydayEventExist(typename: string, event: IEvent): boolean {
   let res = false;
   const result = event.title.localeCompare(typename);
   if (result === 0) {
        console.warn('event entity exist' + event.title);
        res = true;
        }
   return res;
  }

  // if event with title=typename not exist will create new event in this.events

  createEventForNotifications(typename: string, settedDate: Date, eventNotifications: INotification[]) {
    console.warn('step 3 creating new event entity for ' + typename);
    const event = {
            date: settedDate,
            isUserEvent: false,
            title: typename,
            // text: this.eventForm.value['description'],
            notifications: eventNotifications,
            color: 'none'
          } as IEvent;
    this.events = new Array();
    this.events.push(event);
  }

/**
 * Method will delete exist notification from android system(not usable for this.newnotifications)
 * and delete notification from notifications array in event
 */

  removeNotificationFromAndroid(arr: INotification[], notificationIndex: number, holydayName: string){
    const notification = arr[notificationIndex];
    console.log(notification);
    arr.splice(notificationIndex, 1);
    this.notificationsService.deleteNotification(notification.id);
    this.removeNotificationFromArray(notification, holydayName);
  }

/**
 * Method will delete exist notification from android system(not usable for this.newnotifications)
 * and delete notification from notifications array in event
 */

  removeUserNotificationFromAndroid(arr: INotification[], notificationIndex: number){
    const notification = arr[notificationIndex];
    console.log(notification);
    arr.splice(notificationIndex, 1);
    this.notificationsService.deleteNotification(notification.id);
  }
  removeNotificationFromArray(notification: INotification, holydayName: string) {
    let notificationIndexToRemove;
    let eventIndexToRemove;
    this.events.forEach((value, index) => {
      if (value.title === holydayName && value.isUserEvent === false) {
        value.notifications.forEach((value, index) => {
          if (value.id === notification.id) {
            notificationIndexToRemove = index;
          }
        });
        value.notifications.splice(notificationIndexToRemove, 1);
        if (value.notifications.length === 0){
          eventIndexToRemove = index;
        }
      }
    });
    if (eventIndexToRemove !== undefined){
      this.events.splice(eventIndexToRemove, 1);
    }
  }

/**
 * Method get string from Parsha enum
 */

  getParshaName(num: number){
    return Parsha[num];
  }

/**
 * Method get all events for day from StorageService
 */

  getEvents() {
    this.events = this.storageService.getEventsForDate(this.model.year + '-' + this.model.month + '-' + this.model.day);
    console.log('All events for day:');
    console.log(this.events);
    this.getUserEvents();
  }

/**
 * Method take userEvents from this.events
 */

  getUserEvents() {
    if (this.events !== undefined && this.dayInfo.events) {
      this.userEvents = new Array();
      this.events.forEach(value => {
        if (value.isUserEvent === true) {
          this.userEvents.push(value);
        } else {
          console.log('no user events');
        }
      });
    }
  }


/**
 * Method get dates in NgbDateStruct format from SelectedDateServise
 */

  getDataString() {
    this.dates = this.selectedDateServise.selectedDateSubscribtion.getValue();
    this.model = this.dates.georgianDate;
    this.hebrewDateModel = this.dates.hebrewDate;
    const date = new Date();
    date.setFullYear(this.model.year, this.model.month - 1, this.model.day);
    this.ZmanimCalendar.setDate(date);
    console.log('zmanim date: ' + (this.ZmanimCalendar.getDate()).toLocaleString());
  }

/**
 * Method return date string in hebrew language and hebrew format (5780 year...) for date
 */

  getHebrewDate(): string {
    return this.i18n.getDayNumerals(this.hebrewDateModel) + '-' + this.i18n.getMonthShortName(this.hebrewDateModel.month)
    + '-' + this.i18n.getYearNumerals(this.hebrewDateModel.year);
  }

/**
 * Method return date string in gregorian format
 */

  getGeorgianDate(): string {
    return this.model.year + '-' + this.model.month + '-' + this.model.day;
  }

/**
 * Method return date string in number format and hebrew format (5780 year...) for date
 */

  getHebrewDateNumbers(): string {
    return this.hebrewDateModel.year + '-' + this.hebrewDateModel.month + '-' +
    this.hebrewDateModel.day;
  }

/**
 * Check if events exist
 */

  isEvents(): string{
    if (this.userEvents === undefined) {
      return 'No user events';
    } else { return 'Events:'; }
  }

  @HostListener('document:backbutton')
  onBack() {
    this.navCtrl.navigateForward(['menu']);
  }
  @HostListener('document:keydown.r')
  onR() {
    this.navCtrl.navigateForward(['menu']);
  }

/**
 * Method close view
 */
  closeDayView(){
    this.navCtrl.back();
  }
}
