import { Component, OnInit, HostListener, OnDestroy, Renderer2 } from '@angular/core';
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
  geolocation: IGeolocation;

  private buttonBackHandler;
  private buttonMenuHandler;
  private buttonRHandler;
  private buttonQHandler;

  constructor(private navCntrl: NavController, private renderer: Renderer2,
              public geolocationService: GeolocationService) { }


  geolocationForm = new FormGroup({
    country: new FormControl('', Validators.required),
    city: new FormControl({value: '', disabled: true}, Validators.required),
  });

  ionViewWillEnter(): void{
    this.buttonBackHandler = this.renderer.listen('document', 'backbutton', () => this.onMenu());
    this.buttonMenuHandler = this.renderer.listen('document', 'menubutton', () => this.onBack());
    this.buttonRHandler = this.renderer.listen('document', 'keydown.r', () => this.onMenu());
    this.buttonQHandler = this.renderer.listen('document', 'keydown.q', () => this.onBack());
    this.geolocation = this.geolocationService.selectedGeolocationSubscribtion.getValue();
  }

  ionViewWillLeave(): void{
    this.buttonBackHandler();
    this.buttonMenuHandler();
    this.buttonRHandler();
    this.buttonQHandler();
    this.countrySelectedSub.unsubscride();
  }

  onMenu() {
    console.log('back geolocation pressed');
    this.navCntrl.pop();
  }

  onBack() {
    console.log('menu pressed');
  }


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
    this.geolocation = this.geolocationService.selectedGeolocationSubscribtion.getValue();
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

}
