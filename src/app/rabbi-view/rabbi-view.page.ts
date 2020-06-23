import { Component, OnInit, HostListener, Renderer2, ElementRef, ViewChild } from '@angular/core';
import { IDates } from '../core/model/IDates';
import { NgbDateStruct, NgbDatepickerI18nHebrew, NgbDatepickerI18n, NgbDate, NgbCalendarHebrew, NgbCalendar } from '@ng-bootstrap/ng-bootstrap';
import { Router } from '@angular/router';
import { SelectedDateService } from '../core/services/selected-date.service';
import { RabbyJSON } from '../core/model/RabbyJSON';
import { NavController, IonContent } from '@ionic/angular';

/**
 * Page shows data about rabbyes for date, received from SelectedDateService
 */

@Component({
  selector: 'app-rabbi-view',
  templateUrl: './rabbi-view.page.html',
  styleUrls: ['./rabbi-view.page.scss'],
  providers: [
    {provide: NgbDatepickerI18n, useClass: NgbDatepickerI18nHebrew},
    {provide: NgbCalendar, useClass: NgbCalendarHebrew},
  ]
})
export class RabbiViewPage implements OnInit {
  @ViewChild('content') content: IonContent;
  @ViewChild('screen') contentDiv: ElementRef;
  scroll = 0;
  
  dates: IDates;
  model: NgbDateStruct;
  hebrewModel: NgbDateStruct;
  date: string;
  strings: string[];

  private buttonBackHandler;
  private buttonMenuHandler;
  private buttonRHandler;
  private buttonQHandler;
  private buttonUpHandler;
  private buttonDownHandler;
  private buttonRightHandler;
  private buttonLeftHandler;

  constructor(private navCntrl: NavController, private renderer: Renderer2
            , private selectedDateServise: SelectedDateService, public i18n: NgbDatepickerI18n,
              public hebrewCalendar: NgbCalendar) { }

  ngOnInit() {
    this.getDataString();
  }

  ionViewWillEnter(): void{
    this.getDataString();
    this.getRabbyInfo();
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
    const ngbDate = new NgbDate(this.hebrewModel.year, this.hebrewModel.month, this.hebrewModel.day);
    this.hebrewModel = (this.hebrewCalendar as NgbCalendarHebrew).getPrev(ngbDate, 'd', 1);
    this.date = '' + this.hebrewModel.month + '-' + this.hebrewModel.day;
    this.getRabbyInfo();
  }
  onRight(): boolean | void {
    const ngbDate = new NgbDate(this.hebrewModel.year, this.hebrewModel.month, this.hebrewModel.day);
    this.hebrewModel = (this.hebrewCalendar as NgbCalendarHebrew).getNext(ngbDate, 'd', 1);
    this.date = '' + this.hebrewModel.month + '-' + this.hebrewModel.day;
    this.getRabbyInfo();
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
    this.navCntrl.navigateForward('hebrewdatepicker');
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
 * Setting date from SelectedDateService and setting this.date in format for RabbyJSON
 */

getDataString() {
  this.dates = this.selectedDateServise.selectedDateSubscribtion.getValue();
  this.model = this.dates.georgianDate;
  this.hebrewModel = this.dates.hebrewDate;
  this.date = '' + this.hebrewModel.month + '-' + this.hebrewModel.day;
}

getRabbyInfo() {
  this.strings = RabbyJSON[this.date];
}

getHebrewDate(): string {
  return this.i18n.getDayNumerals(this.hebrewModel) + ' ' + this.i18n.getMonthShortName(this.hebrewModel.month)
  + ' ' + this.i18n.getYearNumerals(this.hebrewModel.year);
}

}
