import { Storage } from '@ionic/storage';
import { Injectable } from '@angular/core';
import { IEvent } from '../model/IEvent';
import { File } from '@ionic-native/file/ngx';
import { ToastController } from '@ionic/angular';

/**
 * Service for working with Storage - Ionic Storage. In documentation prefer se only one instanse of Storage
 * method have Map events, that download to virtual memory from database for real time work (Storage work only with promises)
 * (key in format string 'yyyy-m-d')
 */

@Injectable({
  providedIn: 'root'
})
export class StorageService {
  public events = new Map<string, IEvent[]>();
  constructor(private storage: Storage, private file: File, public toastController: ToastController) {}

/**
 * Method take event Map from Ionic Storage
 */

  getEventsFromDB(): Promise<boolean> {
     const promise = new Promise<boolean>((resolve, reject) => {
      this.storage.forEach((value, key) => {
        this.events.set(key, value);
      }).then((d) => {
        resolve(true),
        reject(false);
      });
    });
     return promise;
  }

/**
 * Method return all exist events
 */

  getAllEvents(): Map<string, IEvent[]> {
    return this.events;
  }

/**
 * Method clear database and this.events Map
 */

  removeDatabase() {
    this.storage.clear();
    this.events.clear();
    this.presentToast('database been clear');
  }

/**
 * Method return all events for date )(key in format string 'yyyy-m-d')
 */

  getEventsForDate(date: string): IEvent[]{
      return this.events.get(date);
  }

/**
 * Method rewrites all events for date
 */

  setEventsForDate(date: string, events: IEvent[]){
    this.events.set(date, events);
    this.storage.set(date, events);
  }

/**
 * Method send event to Database and this.events, and generate key (key in format string 'yyyy-m-d')
 */

  setEvent(event: IEvent) {
    const modelNgbDate = event.date.getUTCFullYear() + '-' + (event.date.getUTCMonth() + 1)
     + '-' + (event.date.getUTCDate());
    console.log(modelNgbDate);
    const eventsObj = [] as IEvent[];
    if (this.events.has(modelNgbDate)){
      const eventsArr = this.events.get(modelNgbDate);
      eventsArr.push(event);
      this.events.set(modelNgbDate, eventsArr);
      this.storage.set(modelNgbDate, eventsArr);
    } else {
      eventsObj.push(event);
      this.storage.set(modelNgbDate, eventsObj);
      this.events.set(modelNgbDate, eventsObj);
  }
  }

/**
 * Method send text-file in JSON format, that contains all events from DB
 * use class file: File from IonicNative that privides write files in android system
 */

  setFileInStorage(){
      let myFile = {};

      this.events.forEach(function(value, key){
        myFile[key] = value;
    });
      const file = JSON.stringify(myFile);
      this.file.writeFile(this.file.dataDirectory, 'text.txt', file, {replace: true}).then(() => {
          console.log('file added');
          this.presentToast('Your settings have been saved.');
      })
      .catch((err) => {
        console.error(err);
      });
    }

/**
 * Method take text-file in JSON format, that contains all events from DB and fill this.events and rewrite DB
 * use class file: File from IonicNative that privides read files in android system
 */

  getFileFromStorage() {
      this.file.readAsText(this.file.dataDirectory, 'text.txt').then(value => {
        let newFile = {};
        newFile = JSON.parse(value);
        console.warn(newFile);
        Object.keys(newFile).forEach((k) => {
          console.log('downloaded events:')
          console.log(k + ' - ' + newFile[k]);
          this.storage.set(k, newFile[k]);
          this.events.set(k, newFile[k]);
      });
        this.presentToast('Your settings have been downloaded.');
    });
    }

/**
 * Method async that shows tost in the all views in the page
 */

    async presentToast(message: string) {
      const toast = await this.toastController.create({
        message: message,
        duration: 2000
      });
      toast.present();
    }
}
