import { Component, OnInit, HostListener, Renderer2 } from '@angular/core';
import { FormGroup, FormControl, Validators, FormArray } from '@angular/forms';
import { DatePicker } from '@ionic-native/date-picker/ngx';
import { INotification } from 'src/app/core/model/INotification';
import { INewNotification } from 'src/app/core/model/INewNotification';
import { EventsService } from 'src/app/core/services/events.service';
import { IEvent } from 'src/app/core/model/IEvent';
import { Router } from '@angular/router';
import { NavController } from '@ionic/angular';
import { DatePipe } from '@angular/common';
import { NotificationsService } from 'src/app/core/services/notifications.service';

/**
 * Page for Creating new Event; type IEvent
 */

@Component({
  selector: 'app-create-event',
  templateUrl: './create-event.component.html',
  styleUrls: ['./create-event.component.scss'],
  providers: [DatePicker, DatePipe]
})
export class CreateEventComponent implements OnInit {
  selectedDate = new Date();
  selectedTime = new Date();
  notifications: INewNotification[] = [];
  eventNotifications: INotification[] = [];
  addEventOpen = false;

  private buttonBackHandler;
  private buttonMenuHandler;
  private buttonRHandler;
  private buttonQHandler;

  eventForm = new FormGroup({
    date: new FormControl('', [Validators.required]),
    time: new FormControl('', Validators.required),
    title: new FormControl('', [Validators.maxLength(100)]),
    description: new FormControl('', [Validators.required, Validators.maxLength(300)]),
  });

  constructor(private datePicker: DatePicker, private eventsService: EventsService,
              private renderer: Renderer2, public navCntrl: NavController,
              private datePipe: DatePipe, private notificationsService: NotificationsService) { }

  ngOnInit() {
/**
 * Creating new notification for Event 1 hour before for all new events
 */
    const basicNotification = {
      unitsType: 'HOURS_BEFORE',
      unitsBefore: 1
    } as INewNotification;
    this.notifications.push(basicNotification);
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
    console.log('back settings pressed');
    this.navCntrl.pop();
  }

  onBack() {
    console.log('menu pressed');
  }
/**
 * Creating notification and close CreateNotificationComponent
 */

  createNotification(notification: INewNotification) {
    this.notifications.push(notification);
    this.addEventOpen = !this.addEventOpen;
  }

/**
 * Method calls native android datepicker for date
 */

  selectADate(){
    this.datePicker.show({
      date: this.selectedDate,
      mode: 'date'
    }).then(
      date => {this.selectedDate = date; this.eventForm.patchValue({['date']: this.selectedDate}); },
      err => console.log('Error occurred while getting date: ', err)
    );
  }

/**
 * Method calls native android datepicker for time
 */

  selectATime(){
    this.datePicker.show({
      date: this.selectedTime,
      mode: 'time',
      is24Hour: true,
    }).then(
      time => {this.selectedTime = time; this.eventForm.patchValue({['time']: this.selectedTime}); },
      err => console.log('Error occurred while getting date: ', err)
    );
  }

/**
 * Submitting the form, create INotifications from INewNotification[],
 * add all new notifications to new event array and create new IEvent in
 * EventsService.createEvent
 */

  onSubmit() {
    console.log(this.eventForm.value);
    console.log('creating event');
    // setting Date date and Date time for event from two datepicker dates
    let settedDate = new Date(Date.parse(this.eventForm.value['date']));
    let settedTime = new Date(Date.parse(this.eventForm.value['time']));
    settedDate.setHours(settedTime.getHours());
    settedDate.setMinutes(settedTime.getMinutes());
    console.log(settedDate instanceof Date);
    // Creating new notifications in format INotification
    this.notifications.forEach(value => {
      const notificationDate = new Date(settedDate);
      switch (value.unitsType) {
        case 'MINUTES_BEFORE':
          notificationDate.setMinutes(settedDate.getMinutes() - value.unitsBefore);
          break;
        case 'HOURS_BEFORE':
          notificationDate.setHours(settedDate.getHours() - value.unitsBefore);
          break;
        case 'DAYS_BEFORE':
          notificationDate.setDate(settedDate.getDate() - value.unitsBefore);
          break;
        case 'MONTS_BEFORE':
          notificationDate.setMonth(settedDate.getMonth() - value.unitsBefore);
          break;
        default:
          console.error('Wrong data!');
      }
      const notification = {
      id: this.notificationsService.getNotificationId(this.datePipe.transform(settedDate, 'yyyyMddHHmm')),
      title: 'Event on: ' + this.datePipe.transform(settedDate, 'yyyy-M-dd HH:mm'),
      text: value.unitsBefore + ' ' + value.unitsType + ' ' + this.eventForm.value['title'],
      trigger: {at: notificationDate},
      unitsBefore: value.unitsBefore,
      unitsType: value.unitsType
      } as INotification;
      this.eventNotifications.push(notification);
    });
    console.log(this.eventNotifications);
    const event = {
      date: settedDate,
      isUserEvent: true,
      title: this.eventForm.value['title'],
      text: this.eventForm.value['description'],
      notifications: this.eventNotifications,
      color: 'none',
      isCollapsed: true,
      isNotificationsCollapsed: false
    } as IEvent;
    console.log(event);
    console.log('event created');
    this.eventsService.createEvent(event);
    this.navCntrl.navigateForward('hebrewdatepicker');
  }

}
