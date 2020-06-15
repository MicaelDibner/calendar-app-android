import { Component, OnInit, HostListener, ViewChild } from '@angular/core';
import { Router } from '@angular/router';

import { GeoLocation, ComplexZmanimCalendar} from 'kosher-zmanim';
import { SelectedDateService } from '../core/services/selected-date.service';
import { IDates } from '../core/model/IDates';
import { NgbDateStruct } from '@ng-bootstrap/ng-bootstrap';
import { TranslateService } from '@ngx-translate/core';
import { GeolocationService } from '../core/services/geolocation.service';
import { IGeolocation } from '../core/model/IGeolocation';

/**
 * Page calculates times of prays for date, received from SelectedDateService
 */

@Component({
  selector: 'app-times-view',
  templateUrl: './times-view.page.html',
  styleUrls: ['./times-view.page.scss'],
})
export class TimesViewPage implements OnInit {
  constructor(private router: Router, private selectedDateServise: SelectedDateService, public translate: TranslateService,
              private geolocationServise: GeolocationService) { }
  dates: IDates;
  model: NgbDateStruct;
  complexZmanimCalendar = new ComplexZmanimCalendar();

/**
 * Setting geolocation and date
 */

  ngOnInit(): void {
    this.getDataString();
  }

  ionViewWillEnter(): void{
    this.getDataString();
  }

/**
 * Receiving date from SelectedDateService, and setting date to complexZmanimCalendar instance
 */

  getDataString() {
    this.dates = this.selectedDateServise.selectedDateSubscribtion.getValue();
    this.model = this.dates.georgianDate;
    const date = new Date();
    date.setFullYear(this.model.year, this.model.month - 1, this.model.day);
    console.log(date);
    this.complexZmanimCalendar.setDate(date);

    const geoLocation: IGeolocation = this.geolocationServise.selectedGeolocationSubscribtion.getValue();
    const geoLocationCalendar: GeoLocation = new GeoLocation(geoLocation.city , geoLocation.latitude, geoLocation.longitude,
    geoLocation.elevation, geoLocation.time_zone);
    this.complexZmanimCalendar.setGeoLocation(geoLocationCalendar);
  }

/**
 * Generate string for received date
 */

  getGeorgianDate(): string {
    return this.model.day  + ' ' + this.model.month  + ' ' + this.model.year;
  }

  // @HostListener('window:keydown.arrowup')
  // onArrowUp() {
  //   this.scroll = this.scroll - 25;
  // }

  // @HostListener('window:keydown.arrowdown')
  // onArrowDown() {
  //   this.scroll = this.scroll + 25;
  // }

  @HostListener('document:menubutton')
  onMenu() {
    this.router.navigate(['today-times-view']);
  }
  @HostListener('document:keydown.q')
  onQ() {
    this.router.navigate(['today-times-view']);
  }
  @HostListener('document:backbutton')
  onBack() {
    this.router.navigate(['menu']);
  }
  @HostListener('document:keydown.r')
  onR() {
    this.router.navigate(['menu']);
  }

}
