import { Injectable } from '@angular/core';
import { LocalNotifications } from '@ionic-native/local-notifications/ngx';
import { INotification } from '../model/INotification';

/**
 * Service that handle notifications and send them to android system
 * for every notification generate unical id based on date + number
 */

@Injectable({
  providedIn: 'root',
})
export class NotificationsService {
  notificationId = 0;

  constructor(private localNotifications: LocalNotifications) { }


  getNotificationId(date: string): number{
    const id = parseInt((date + this.notificationId));
    this.notificationId++;
    return id;
  }

/**
 * Method send 1 notification to android sheduler, date must be triggered in the future
 */

  createNotification(notification: INotification){
    this.localNotifications.schedule({
      id: notification.id,
      title: notification.title,
      text: notification.text,
      wakeup: true,
      trigger: notification.trigger
    });
  }

/**
 * Method send array of notifications to android sheduler, date must be triggered in the future
 */

  createNotifications(notifications: INotification[]){
    notifications.forEach((value: INotification) => {
      this.localNotifications.schedule({
        id: value.id,
        title: value.title,
        text: value.text,
        wakeup: true,
        trigger: value.trigger
      });
    });
  }

/**
 * Method that delete notification from android
 */

  deleteNotification(notificationID: number) {
    this.localNotifications.clear(notificationID).then(() => 
    {console.log('notification with id: ' + notificationID + 'deleted'); });
  }
}
