import { Component, OnInit, HostListener } from '@angular/core';
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

  eventForm = new FormGroup({
    date: new FormControl('', [Validators.required]),
    time: new FormControl('', Validators.required),
    title: new FormControl('', [Validators.maxLength(100)]),
    description: new FormControl('', [Validators.required, Validators.maxLength(300)]),
  });

  constructor(private datePicker: DatePicker, private eventsService: EventsService,
              private router: Router, public navCtrl: NavController,
              private datePipe: DatePipe, private notificationsService: NotificationsService) { }

  ngOnInit() {
    const basicNotification = {
      unitsType: 'Hours before',
      unitsBefore: 1
    } as INewNotification;
    this.notifications.push(basicNotification);
  }

  addNotification(){
    this.navCtrl.navigateForward(['menu/createNotification']);
  }

  createNotification(notification: INewNotification) {
    this.notifications.push(notification);
    this.addEventOpen = !this.addEventOpen;
  }

  selectADate(){
    this.datePicker.show({
      date: this.selectedDate,
      mode: 'date'
    }).then(
      date => {this.selectedDate = date; this.eventForm.patchValue({['date']: this.selectedDate}); },
      err => console.log('Error occurred while getting date: ', err)
    );
  }

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

  onSubmit() {
    console.log(this.eventForm.value);
    console.log('creating event');
    let settedDate = new Date(Date.parse(this.eventForm.value['date']));
    let settedTime = new Date(Date.parse(this.eventForm.value['time']));
    settedDate.setHours(settedTime.getHours());
    settedDate.setMinutes(settedTime.getMinutes());
    console.log(settedDate instanceof Date);
    this.notifications.forEach(value => {
      const notificationDate = new Date(settedDate);
      switch (value.unitsType) {
        case 'Minutes before':
          notificationDate.setMinutes(settedDate.getMinutes() - value.unitsBefore);
          break;
        case 'Hours before':
          notificationDate.setHours(settedDate.getHours() - value.unitsBefore);
          break;
        case 'Days before':
          notificationDate.setDate(settedDate.getDate() - value.unitsBefore);
          break;
        case 'Months before':
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
    this.navCtrl.navigateForward('/hebrewdatepicker');
  }

  @HostListener('document:backbutton')
onMenu() {
    console.log('back pressed');
    this.navCtrl.pop();
  }
@HostListener('document:keydown.r')
onQ() {
    console.log('back pressed');
    this.navCtrl.pop();
  }
  @HostListener('document:keydown.enter')
  onEnter() {
    console.log('menu enter pressed');
    }

}
