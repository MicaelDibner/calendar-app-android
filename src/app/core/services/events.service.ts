import { Injectable } from '@angular/core';
import { StorageService } from './storage.service';
import { IEvent } from '../model/IEvent';
import { NotificationsService } from './notifications.service';
import { INotification } from '../model/INotification';
import { NgbDateStruct } from '@ng-bootstrap/ng-bootstrap/datepicker/ngb-date-struct';

@Injectable({
  providedIn: 'root'
})
export class EventsService {

  constructor(private storageService: StorageService, private notifications: NotificationsService) {
   }

  createEvent(event: IEvent){
    this.storageService.setEvent(event);
    this.notifications.createNotifications(event.notifications);
  }
  
  createHolydayEvent(holydayname: string, time: Date, date: NgbDateStruct, notifications: INotification[]){
    let eventDate = new Date();
    eventDate.setFullYear(date.year, date.month - 1, date.day);
    eventDate.setHours(time.getHours());
    eventDate.setMinutes(time.getMinutes());
    console.log(eventDate);
    const event = {
      date: eventDate,
      isUserEvent: false,
      title: holydayname,
      notifications: notifications,
      color: 'none'
    } as IEvent;
    this.storageService.setEvent(event);
  }

  setEvents(){
    const event = {
      date: new Date(new Date().setMonth((Math.random() * Math.floor(12)))),
      title: 'My event',
      text: 'hello',
      notifications: undefined,
      color: undefined
    } as IEvent;
    this.storageService.setEvent(event);
  }

  getEventCalendarView(date: string) {
    let userEvents = 0;
    if (this.storageService.events.has(date)) {
      const eventsArr = this.storageService.events.get(date);
      eventsArr.forEach(value => {
        if (value.isUserEvent === true) { userEvents++; }
      });
      return userEvents;
    } else {return false; }
  }
  getNotificationsNumberCalendarView(date: string) {
    let notificationsNumber = 0;
    if (this.storageService.events.has(date)) {
      const eventsArr = this.storageService.events.get(date);
      eventsArr.forEach(value => {
        notificationsNumber = notificationsNumber + value.notifications.length;
      }); 
      return notificationsNumber;
    } else {return false; }
  }

  getEventDescriptionsCalendarView(date: string) {
    let events = '';
    if (this.storageService.events.has(date)) {
      this.storageService.events.get(date).forEach((value: IEvent) => {
        events = events + ' ' + value.title;
      });
      return events;
    } else {return false; }
  }
}
