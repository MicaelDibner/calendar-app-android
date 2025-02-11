import { Component, OnInit, HostListener, ViewChild } from '@angular/core';
import { Router } from '@angular/router';

import { GeoLocation, ComplexZmanimCalendar} from 'kosher-zmanim';
import { SelectedDateService } from '../core/services/selected-date.service';
import { IDates } from '../core/model/IDates';
import { NgbDateStruct } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-today-times-view',
  templateUrl: './today-times-view.page.html',
  styleUrls: ['./today-times-view.page.scss'],
})
export class TodayTimesViewPage implements OnInit {
  alos19Point8Degrees: string;
  alos16Point1Degrees: string;
  alos72: string;
  misheyakir11Point5Degrees: string;
  misheyakir11Degrees: string;
  misheyakir10Point2Degrees: string;
  sunrise: string;
  sofZmanShmaAlos16Point1ToSunset: string;
  sofZmanShmaMGA72Minutes: string;
  sofZmanShmaGRA: string;
  chatzos: string;
  minchaGedola: string;
  minchaGedola16Point1Degrees: string;
  minchaGedola72Minutes: string;
  complexZmanimCalendar = new ComplexZmanimCalendar();
  date = new Date();
  minchaKetana: string;
  minchaKetana16Point1Degrees: string;
  minchaKetana72Minutes: string;
  refresh: any;
  plagHamincha: string;
  plagHamincha72Minutes: string;
  sunset: string;
  tzaisGeonim6Point45Degrees: string;
  tzaisGeonim8Point5Degrees: string;
  tzais16Point1Degrees: string;
  tzais72: string;
  shaahZmanis72Minutes: string;
  shaahZmanis16Point1Degrees: string;
  shaahZmanisGra: string;

  constructor(private router: Router, private selectedDateServise: SelectedDateService) { }

  ngOnInit(): void {
    this.complexZmanimCalendar.setDate(this.date);
    const geoLocation: GeoLocation = new GeoLocation('Jerusalem' , 31.76832, 35.21371,
    779.46, 'Asia/Jerusalem');
    this.complexZmanimCalendar.setGeoLocation(geoLocation);
    this.refresh = setInterval(() => {
      this.date = new Date();
      this.alos19Point8Degrees = this.timeConversion(this.complexZmanimCalendar.getAlos19Point8Degrees().ts - Date.now());
      this.alos16Point1Degrees = this.timeConversion(this.complexZmanimCalendar.getAlos16Point1Degrees().ts - Date.now());
      this.alos72 = this.timeConversion(this.complexZmanimCalendar.getAlos72().ts - Date.now());
      this.misheyakir11Point5Degrees = this.timeConversion(this.complexZmanimCalendar.getMisheyakir11Point5Degrees().ts - Date.now());
      this.misheyakir11Degrees = this.timeConversion(this.complexZmanimCalendar.getMisheyakir11Degrees().ts - Date.now());
      this.misheyakir10Point2Degrees = this.timeConversion(this.complexZmanimCalendar.getMisheyakir10Point2Degrees().ts - Date.now());
      this.sunrise = this.timeConversion(this.complexZmanimCalendar.getSunrise().ts - Date.now());
      this.sofZmanShmaAlos16Point1ToSunset = this.timeConversion(this.complexZmanimCalendar
          .getSofZmanShmaAlos16Point1ToSunset().ts - Date.now());
      this.sofZmanShmaMGA72Minutes = this.timeConversion(this.complexZmanimCalendar
          .getSofZmanShmaMGA72Minutes().ts - Date.now());
      this.sofZmanShmaGRA  = this.timeConversion(this.complexZmanimCalendar
          .getSofZmanShmaGRA().ts - Date.now());
      this.chatzos = this.timeConversion(this.complexZmanimCalendar.getChatzos().ts - Date.now());
      this.minchaGedola = this.timeConversion(this.complexZmanimCalendar.getMinchaGedola().ts - Date.now());
      this.minchaGedola16Point1Degrees = this.timeConversion(this.complexZmanimCalendar.getMinchaGedola16Point1Degrees().ts - Date.now());
      this.minchaGedola72Minutes = this.timeConversion(this.complexZmanimCalendar.getMinchaGedola72Minutes().ts - Date.now());
      this.minchaKetana = this.timeConversion(this.complexZmanimCalendar.getMinchaKetana().ts - Date.now());
      this.minchaKetana16Point1Degrees = this.timeConversion(this.complexZmanimCalendar.getMinchaKetana16Point1Degrees().ts - Date.now());
      this.minchaKetana72Minutes = this.timeConversion(this.complexZmanimCalendar.getMinchaKetana72Minutes().ts - Date.now());
      this.plagHamincha = this.timeConversion(this.complexZmanimCalendar.getPlagHamincha().ts - Date.now());
      this.plagHamincha72Minutes = this.timeConversion(this.complexZmanimCalendar.getPlagHamincha72Minutes().ts - Date.now());
      this.sunset = this.timeConversion(this.complexZmanimCalendar.getSunset().ts - Date.now());
      this.tzaisGeonim6Point45Degrees = this.timeConversion(this.complexZmanimCalendar.getTzaisGeonim6Point45Degrees().ts - Date.now());
      this.tzaisGeonim8Point5Degrees = this.timeConversion(this.complexZmanimCalendar.getTzaisGeonim8Point5Degrees().ts - Date.now());
      this.tzais16Point1Degrees = this.timeConversion(this.complexZmanimCalendar.getTzais16Point1Degrees().ts - Date.now());
      this.tzais72 = this.timeConversion(this.complexZmanimCalendar.getTzais72().ts - Date.now());
      this.shaahZmanis72Minutes = this.timeConversion(this.complexZmanimCalendar.getShaahZmanis72Minutes() - Date.now());
      this.shaahZmanis16Point1Degrees = this.timeConversion(this.complexZmanimCalendar.getShaahZmanis16Point1Degrees() - Date.now());
      this.shaahZmanisGra = this.timeConversion(this.complexZmanimCalendar.getShaahZmanisGra() - Date.now());
      console.log('count');
    }, 1000);
  }

  ionViewWillLeave(): void{
    clearInterval(this.refresh);
  }

  timeConversion(duration: number) {
    const portions: string[] = [];
    
    const msInHour = 1000 * 60 * 60;
    const hours = Math.trunc(duration / msInHour);
    if (hours > 0) {
      portions.push(hours + 'h');
      duration = duration - (hours * msInHour);
    }
    const msInMinute = 1000 * 60;
    const minutes = Math.trunc(duration / msInMinute);
    if (minutes > 0) {
      portions.push(minutes + 'm');
      duration = duration - (minutes * msInMinute);
    }
    const seconds = Math.trunc(duration / 1000);
    if (seconds > 0) {
      portions.push(seconds + 's');
    } else if (seconds < 0) {return 'Pass'; }
    return portions.join(' ');
  }

  ionViewWillEnter(): void{
    this.complexZmanimCalendar.setDate(this.date);
  }

  getGeorgianDate(): string {
    return this.date.getDate() + ' ' + (this.date.getMonth() + 1)  + ' ' + this.date.getFullYear();
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
    this.router.navigate(['study-view']);
  }
  @HostListener('document:keydown.q')
  onQ() {
    this.router.navigate(['study-view']);
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
