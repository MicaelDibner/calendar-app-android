import { Storage } from '@ionic/storage';
import { Injectable } from '@angular/core';
import { IEvent } from '../model/IEvent';
import { File, FileSaver } from '@ionic-native/file/ngx';
import { ToastController } from '@ionic/angular';

@Injectable({
  providedIn: 'root'
})
export class StorageService {
  public events = new Map<string, IEvent[]>();
  constructor(private storage: Storage, private file: File, public toastController: ToastController) {}

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

  getAllEvents(): Map<string, IEvent[]> {
    return this.events;
  }

  removeDatabase() {
    this.storage.clear();
    this.events.clear();
    this.presentToast('database been clear');
  }

  getEventsForDate(date: string): IEvent[]{
      return this.events.get(date);
  }
  setEventsForDate(date: string, events: IEvent[]){
    this.events.set(date, events);
    this.storage.remove(date);
    this.storage.set(date, events);
  }

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

    async presentToast(message: string) {
      const toast = await this.toastController.create({
        message: message,
        duration: 2000
      });
      toast.present();
    }
}
