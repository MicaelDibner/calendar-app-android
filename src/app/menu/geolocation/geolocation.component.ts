import { Component, OnInit, HostListener } from '@angular/core';
import { NavController } from '@ionic/angular';
import { Observable } from 'rxjs';
import {debounceTime, distinctUntilChanged, map} from 'rxjs/operators';
import { FormGroup, FormControl, Validators } from '@angular/forms';

import { GeolocationData } from 'src/app/core/model/GeolocationData';
import { GeolocationService } from 'src/app/core/services/geolocation.service';
import { IGeolocation } from 'src/app/core/model/IGeolocation';
import { GeoLocation } from 'kosher-zmanim';

const countries = ['Israel', 'USA', 'Russia', 'France', 'Germany'];

@Component({
  selector: 'app-geolocation',
  templateUrl: './geolocation.component.html',
  styleUrls: ['./geolocation.component.scss'],
})
export class GeolocationComponent implements OnInit {
  cities = [];
  countrySelectedSub: any;

  constructor(private navCntrl: NavController, public geolocationService: GeolocationService) { }

  geolocationForm = new FormGroup({
    country: new FormControl('', Validators.required),
    city: new FormControl({value: '', disabled: true}, Validators.required),
  });


  formatter = (result: string) => result.toUpperCase();

  countrysearch = (text$: Observable<string>) =>
    text$.pipe(
      debounceTime(200),
      distinctUntilChanged(),
      map(term => term === '' ? []
        : countries.filter(v => v.toLowerCase().indexOf(term.toLowerCase()) > -1).slice(0, 10))
    )
  citysearch = (text$: Observable<string>) =>
    text$.pipe(
      debounceTime(200),
      distinctUntilChanged(),
      map(term => term === '' ? []
        : this.cities.filter(v => v.toLowerCase().indexOf(term.toLowerCase()) > -1).slice(0, 10))
  )

  ngOnInit() {
    this.onFormChanges();
  }

  onFormChanges(){
    this.countrySelectedSub = this.geolocationForm.get('country').statusChanges.subscribe(x => {
      if (x === 'VALID') {
        if (this.geolocationForm.get('country').value === 'Israel'){
          this.cities = ['Jerusalem', 'Haifa'];
        }
        this.geolocationForm.get('city').enable();
        if (this.geolocationForm.get('country').value === 'Russia'){
          this.cities = ['Moscow'];
        }
        this.geolocationForm.get('city').enable();
      }
      if (x === 'INVALID') {
        this.geolocationForm.get('city').disable();
      }
    });
  }

  ionViewWillLeave(): void{
    this.countrySelectedSub.unsubscride();
  }

  onSubmit(){
    const country = this.geolocationForm.get('country').value;
    const city = this.geolocationForm.get('city').value;
    GeolocationData[country].forEach(value => {
      if (value.city === city) {
        console.log(value);
        const newGeolocation = {
          country: value.country,
          city: value.city,
          latitude: value.latitude,
          longitude: value.longitude,
          elevation: value.elevation,
          time_zone: value.time_zone
        } as IGeolocation;
        console.log(newGeolocation);
        this.geolocationService.selectedGeolocationSubscribtion.next(newGeolocation);
      }
    });
    this.navCntrl.pop();
  }

  @HostListener('document:backbutton')
  onMenu() {
      console.log('back settings pressed');
      this.navCntrl.pop();
    }
  @HostListener('document:keydown.r')
  onQ() {
      console.log('back settings pressed');
      this.navCntrl.pop();
      // this.location.back();
  }

}
