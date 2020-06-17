import {Component, OnInit, OnDestroy, ViewChild, HostListener, AfterViewInit, Renderer2} from '@angular/core';
import {NgbDateStruct, NgbCalendar, NgbDatepickerI18nHebrew, NgbDatepicker, NgbCalendarHebrew, NgbDate, NgbDatepickerKeyboardService} from '@ng-bootstrap/ng-bootstrap';
import { SelectedDateService } from '../core/services/selected-date.service';
import { IDates } from '../core/model/IDates';
import { DayTemplateContext } from '@ng-bootstrap/ng-bootstrap/datepicker/datepicker-day-template-context';
import { Router } from '@angular/router';
import { CustomKeyboardService } from '../core/services/custom-keyboard.service';
import { NavController } from '@ionic/angular';

@Component({
  selector: 'app-basicdatepicker',
  templateUrl: './basicdatepicker.component.html',
  styleUrls: ['./basicdatepicker.component.css'],
  providers: [NgbDatepickerI18nHebrew, NgbCalendarHebrew,
    {provide: NgbDatepickerKeyboardService, useClass: CustomKeyboardService}, ]
})
export class BasicdatepickerComponent implements OnInit, AfterViewInit {
  @ViewChild('dp') datepicker: NgbDatepicker;
  @ViewChild('dt') daytemplate: DayTemplateContext;
  dates: IDates;
  model: NgbDate;
  hebrewDateModel: NgbDateStruct;
  private button1Handler;
  private button3Handler;
  private buttonBackHandler;
  private buttonMenuHandler;
  private buttonRHandler;
  private buttonQHandler;

  constructor(private calendar: NgbCalendar, private selectedDateServise: SelectedDateService,
              public i18n: NgbDatepickerI18nHebrew, private hebrewCalendar: NgbCalendarHebrew,
              private navCntrl: NavController, private renderer: Renderer2 ) {
  }

  ngOnInit(): void {
    this.dates = this.selectedDateServise.selectedDateSubscribtion.getValue();
    this.model = new NgbDate(this.dates.georgianDate.year, this.dates.georgianDate.month,
        this.dates.georgianDate.day);
    this.hebrewDateModel = this.dates.hebrewDate;
}

  ngAfterViewInit(): void {
      this.datepicker.focusDate(this.model);
      this.datepicker.focusSelect();
      this.datepicker.focus();
  }

  ionViewWillEnter(): void{
    this.dates = this.selectedDateServise.selectedDateSubscribtion.getValue();
    this.model = new NgbDate(this.dates.georgianDate.year, this.dates.georgianDate.month,
    this.dates.georgianDate.day);
    this.datepicker.focusDate(this.model);
    this.datepicker.focusSelect();
    this.datepicker.focus();
    this.button1Handler = this.renderer.listen('document', 'keydown.1', event => this.onStar());
    this.button3Handler = this.renderer.listen('document', 'keydown.3', event => this.onGrid());
    this.buttonBackHandler = this.renderer.listen('document', 'backbutton', () => this.onMenu());
    this.buttonMenuHandler = this.renderer.listen('document', 'menubutton', () => this.onBack());
    this.buttonRHandler = this.renderer.listen('document', 'keydown.r', () => this.onMenu());
    this.buttonQHandler = this.renderer.listen('document', 'keydown.q', () => this.onBack());

  }

  ionViewWillLeave(): void{
    console.log('user leave');
    this.emitDate(this.model);
    this.button1Handler();
    this.button3Handler();
    this.buttonBackHandler();
    this.buttonMenuHandler();
    this.buttonRHandler();
    this.buttonQHandler();
  }

  onGrid() {
    this.datepicker.onNavigateEvent(1);
  }

  onStar() {
    this.datepicker.onNavigateEvent(0);
  }

  onMenu() {
    this.navCntrl.navigateForward('menu');
  }

  onBack() {
    this.navCntrl.navigateForward('times-view');
  }
 

  emitDate(model: NgbDate) {
    this.dates = {
      georgianDate: model,
      hebrewDate: this.hebrewCalendar.fromGregorian(model)
    };
    this.selectedDateServise.selectedDateSubscribtion.next(this.dates);
  }

  selectToday() {
    this.model = this.calendar.getToday();
  }

  getHebrewDate(): string {
    return this.i18n.getDayNumerals(this.hebrewDateModel) + ' ' + this.i18n.getMonthShortName(this.hebrewDateModel.month)
    + ' ' + this.i18n.getYearNumerals(this.hebrewDateModel.year);
  }

  getGeorgianDate(): string {
    return this.model.year + ' ' + this.model.month + ' ' + this.model.day;
  }

  isFriday = (date: NgbDate) =>  this.calendar.getWeekday(date) === 5;
  isSaturday = (date: NgbDate) =>  this.calendar.getWeekday(date) === 6;

}
