import { Component, OnInit, HostListener, ViewChild } from '@angular/core';
import { Router } from '@angular/router';

import { GeoLocation, ComplexZmanimCalendar} from 'kosher-zmanim';
import { SelectedDateService } from '../core/services/selected-date.service';
import { IDates } from '../core/model/IDates';
import { NgbDateStruct } from '@ng-bootstrap/ng-bootstrap';

/**
 * Page calculates times of prays for date, received from SelectedDateService
 */

@Component({
  selector: 'app-times-view',
  templateUrl: './times-view.page.html',
  styleUrls: ['./times-view.page.scss'],
})
export class TimesViewPage implements OnInit {
  constructor(private router: Router, private selectedDateServise: SelectedDateService) { }
  dates: IDates;
  model: NgbDateStruct;
  complexZmanimCalendar = new ComplexZmanimCalendar();

/**
 * Setting geolocation and date
 */

  ngOnInit(): void {
    this.getDataString();
    const geoLocation: GeoLocation = new GeoLocation('Jerusalem' , 31.76832, 35.21371,
    779.46, 'Asia/Jerusalem');
    this.complexZmanimCalendar.setGeoLocation(geoLocation);
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
