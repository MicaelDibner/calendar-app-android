import { Component, OnInit, HostListener, ViewChild, Renderer2, ElementRef } from '@angular/core';
import { Router } from '@angular/router';

import { GeoLocation, ComplexZmanimCalendar} from 'kosher-zmanim';
import { SelectedDateService } from '../core/services/selected-date.service';
import { IDates } from '../core/model/IDates';
import { NgbDateStruct, NgbDate, NgbCalendar } from '@ng-bootstrap/ng-bootstrap';
import { TranslateService } from '@ngx-translate/core';
import { GeolocationService } from '../core/services/geolocation.service';
import { IGeolocation } from '../core/model/IGeolocation';
import { NavController, IonContent } from '@ionic/angular';

/**
 * Page calculates times of prays for date, received from SelectedDateService
 */

@Component({
  selector: 'app-times-view',
  templateUrl: './times-view.page.html',
  styleUrls: ['./times-view.page.scss'],
})
export class TimesViewPage implements OnInit {
  @ViewChild('content') content: IonContent;
  @ViewChild('screen') contentDiv: ElementRef;

  dates: IDates;
  model: NgbDateStruct;
  complexZmanimCalendar = new ComplexZmanimCalendar();
  scroll = 0;
  date = new Date();

  private buttonBackHandler;
  private buttonMenuHandler;
  private buttonRHandler;
  private buttonQHandler;
  private buttonUpHandler;
  private buttonDownHandler;
  private buttonRightHandler;
  private buttonLeftHandler;

  constructor(private navCntrl: NavController, private renderer: Renderer2,
              private selectedDateServise: SelectedDateService, public translate: TranslateService,
              private geolocationServise: GeolocationService, private calendar: NgbCalendar) {}

/**
 * Setting geolocation and date
 */

  ngOnInit(): void {
    this.getDataString();
  }

  ionViewWillEnter(): void{
    this.getDataString();
    this.buttonBackHandler = this.renderer.listen('document', 'backbutton', () => this.onMenu());
    this.buttonMenuHandler = this.renderer.listen('document', 'menubutton', () => this.onBack());
    this.buttonRHandler = this.renderer.listen('document', 'keydown.r', () => this.onMenu());
    this.buttonQHandler = this.renderer.listen('document', 'keydown.q', () => this.onBack());
    this.buttonUpHandler = this.renderer.listen('window', 'keydown.arrowup', (event) => this.onUp(event));
    this.buttonDownHandler  = this.renderer.listen('window', 'keydown.arrowdown', (event) => this.onDown(event));
    this.buttonRightHandler = this.renderer.listen('window', 'keydown.arrowright', () => this.onRight());
    this.buttonLeftHandler  = this.renderer.listen('window', 'keydown.arrowleft', () => this.onLeft());
  }

  onLeft(): boolean | void {
    const ngbDate = new NgbDate(this.model.year, this.model.month, this.model.day);
    this.model = this.calendar.getPrev(ngbDate, 'd', 1);
    this.setCalendarDate();
  }
  onRight(): boolean | void {
    const ngbDate = new NgbDate(this.model.year, this.model.month, this.model.day);
    this.model = this.calendar.getNext(ngbDate, 'd', 1);
    this.setCalendarDate();
  }


  ionViewWillLeave(): void{
    this.buttonBackHandler();
    this.buttonMenuHandler();
    this.buttonRHandler();
    this.buttonQHandler();
    this.buttonUpHandler();
    this.buttonDownHandler();
    this.buttonRightHandler();
    this.buttonLeftHandler();
  }

  onMenu() {
    this.navCntrl.navigateForward('menu');
  }

  onBack() {
    this.navCntrl.navigateForward('today-times-view');
  }

  onUp(event: KeyboardEvent) {
    event.preventDefault();
    if (this.scroll >= 100) {this.scroll = this.scroll - 100; }
    this.content.scrollToPoint(0, this.scroll);
  }

  onDown(event: KeyboardEvent) {
    event.preventDefault();
    if (this.scroll <= this.contentDiv.nativeElement.scrollHeight - 395) {this.scroll = this.scroll + 100; }
    this.content.scrollToPoint(0, this.scroll);
  }

/**
 * Receiving date from SelectedDateService, and setting date to complexZmanimCalendar instance
 */

  getDataString() {
    this.dates = this.selectedDateServise.selectedDateSubscribtion.getValue();
    this.model = this.dates.georgianDate;
    this.setCalendarDate();
    const geoLocation: IGeolocation = this.geolocationServise.selectedGeolocationSubscribtion.getValue();
    const geoLocationCalendar: GeoLocation = new GeoLocation(geoLocation.city , geoLocation.latitude, geoLocation.longitude,
    geoLocation.elevation, geoLocation.time_zone);
    this.complexZmanimCalendar.setGeoLocation(geoLocationCalendar);
  }

  setCalendarDate() {
    this.date.setFullYear(this.model.year, this.model.month - 1, this.model.day);
    this.complexZmanimCalendar.setDate(this.date);
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
}
