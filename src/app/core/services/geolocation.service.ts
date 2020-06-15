import { Injectable } from '@angular/core';
import { IGeolocation } from '../model/IGeolocation';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class GeolocationService {
  public selectedGeolocationSubscribtion = new BehaviorSubject<IGeolocation>(null);

  constructor() {
    const standartGeolocation = {
      country: 'Israel',
      city: 'Jerusalem',
      latitude: 31.76832,
      longitude: 35.21371,
      elevation: 779.46,
      time_zone: 'Asia/Jerusalem'
    } as IGeolocation;
    this.selectedGeolocationSubscribtion.next(standartGeolocation);
   }
}
