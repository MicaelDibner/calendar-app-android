import { Component, HostListener, ViewChild, OnInit, AfterViewInit, Renderer2, SimpleChange} from '@angular/core';
import {
  NgbCalendar,
  NgbCalendarHebrew, NgbDate,
  NgbDatepickerI18n,
  NgbDatepickerI18nHebrew,
  NgbDateStruct,
  NgbDatepicker,
  NgbDatepickerKeyboardService,
} from '@ng-bootstrap/ng-bootstrap';
import { SelectedDateService } from '../core/services/selected-date.service';
import { CustomKeyboardService } from '../core/services/custom-keyboard.service';
import {IDates} from '../core/model/IDates';
import { EventsService } from '../core/services/events.service';
import { JewishCalendar } from 'kosher-zmanim';
import { Parsha } from 'kosher-zmanim';
import { DatePipe, Location } from '@angular/common';
import { NavController } from '@ionic/angular';
import { IDayInfoModel } from '../core/model/IDayInfoModel';
import { NgbDateStructAdapter } from '@ng-bootstrap/ng-bootstrap/datepicker/adapters/ngb-date-adapter';
import { async } from '@angular/core/testing';

const hagim = {
  0: 'EREV_PESACH',
  1: 'PESACH',
  2: 'CHOL_HAMOED_PESACH',
  3: 'PESACH_SHENI',
  4: 'EREV_SHAVUOS',
  5: 'SHAVUOS',
  6: 'SEVENTEEN_OF_TAMMUZ',
  7: 'TISHA_BEAV',
  8: 'TU_BEAV',
  9: 'EREV_ROSH_HASHANA',
  10: 'ROSH_HASHANA',
  11: 'FAST_OF_GEDALYAH',
  12: 'EREV_YOM_KIPPUR',
  13: 'YOM_KIPPUR',
  14: 'EREV_SUCCOS',
  15: 'SUCCOS',
  16: 'CHOL_HAMOED_SUCCOS',
  17: 'HOSHANA_RABBA',
  18: 'SHEMINI_ATZERES',
  19: 'SIMCHAS_TORAH',
  21: 'CHANUKAH',
  22: 'TENTH_OF_TEVES',
  23: 'TU_BESHVAT',
  24: 'FAST_OF_ESTHER',
  25: 'PURIM',
  26: 'SHUSHAN_PURIM',
  27: 'PURIM_KATAN',
  28: 'ROSH_CHODESH',
  29: 'YOM_HASHOAH',
  30: 'YOM_HAZIKARON',
  31: 'YOM_HAATZMAUT',
  32: 'YOM_YERUSHALAYIM'
};

/**
 * Page for Calendar View with custom dayTemplateData
 */

@Component({
  selector: 'app-datepicker',
  templateUrl: './datepicker.component.html',
  styleUrls: ['./datepicker.component.css'],
  providers: [
    DatePipe,
    {provide: NgbCalendar, useClass: NgbCalendarHebrew},
    {provide: NgbDatepickerI18n, useClass: NgbDatepickerI18nHebrew},
    {provide: NgbDatepickerKeyboardService, useClass: CustomKeyboardService},
  ]
})
export class DatepickerComponent implements OnInit, AfterViewInit {
  @ViewChild('dp') datepicker: NgbDatepicker;

  model: NgbDateStruct;
  gregorianModel: NgbDateStruct;
  dates: IDates;
  jewishCalendar = new JewishCalendar();
  // handlers for Renderer2
  private button4Handler;
  private button6Handler;
  private button2Handler;
  private button0Handler;
  private buttonUpHandler;
  private buttonRightHandler;
  private buttonDownHandler;
  private buttonLeftHandler;
  private buttonEnterHandler;
  private buttonBackHandler;
  private buttonMenuHandler;
  private buttonRHandler;
  private buttonQHandler;



  constructor(private calendar: NgbCalendar, public i18n: NgbDatepickerI18n,
              private selectedDateServise: SelectedDateService, public navCtrl: NavController,
              public eventsService: EventsService, private renderer: Renderer2,
              private datePipe: DatePipe) {
    // binding day data
    this.jewishCalendar.setInIsrael(true);
    this.jewishCalendar.setUseModernHolidays(false);
  }
  ngOnInit(): void {
    this.dayTemplateData = this.dayTemplateData.bind(this);
    // creating model instance for NgbDatepicker
    this.dates = this.selectedDateServise.selectedDateSubscribtion.getValue();
    if (this.dates === null) {
      this.model = this.calendar.getToday();
      this.emitDate(this.model);
    }
    if (this.model === undefined) {
      this.model = new NgbDate(this.dates.hebrewDate.year,
        this.dates.hebrewDate.month,
        this.dates.hebrewDate.day);
    }
  }

  ngAfterViewInit(): void {
    
  }

/**
 * Method runs when user come back to screen (custom lifecycle hook for angular), developed by Ionic
 * getting date model if model was emitted to SelectedDateServise
 */

  ionViewWillEnter(): void{
    this.dates = this.selectedDateServise.selectedDateSubscribtion.getValue();
    this.model = this.dates.hebrewDate;
    // start listen the handlers
    this.button4Handler = this.renderer.listen('document', 'keydown.4', () => this.on4());
    this.button6Handler = this.renderer.listen('document', 'keydown.6', () => this.on6());
    this.button2Handler = this.renderer.listen('document', 'keydown.2', () => this.on2());
    this.button0Handler = this.renderer.listen('document', 'keydown.0', () => this.on0());
    this.buttonUpHandler  = this.renderer.listen('window', 'keydown.arrowup', () => this.onUp());
    this.buttonRightHandler = this.renderer.listen('window', 'keydown.arrowright', () => this.onRight());
    this.buttonDownHandler = this.renderer.listen('window', 'keydown.arrowdown', () => this.onDown());
    this.buttonLeftHandler  = this.renderer.listen('window', 'keydown.arrowleft', () => this.onLeft());
    this.buttonEnterHandler = this.renderer.listen('window', 'keydown.enter', () => this.onEnter());
    this.buttonBackHandler = this.renderer.listen('document', 'backbutton', () => this.onMenu());
    this.buttonMenuHandler = this.renderer.listen('document', 'menubutton', () => this.onBack());
    this.buttonRHandler = this.renderer.listen('document', 'keydown.r', () => this.onMenu());
    this.buttonQHandler = this.renderer.listen('document', 'keydown.q', () => this.onBack());
    this.datepicker.focusDate(this.model);
    this.datepicker.focusSelect();
    this.datepicker.focus();
  }

/**
 * Method runs when user leave screen (custom lifecycle hook for angular), developed by Ionic
 */

  ionViewWillLeave(): void{
    this.emitDate(this.model);
    this.button4Handler();
    this.button6Handler();
    this.button2Handler();
    this.button0Handler();
    this.buttonUpHandler();
    this.buttonRightHandler();
    this.buttonDownHandler();
    this.buttonLeftHandler();
    this.buttonEnterHandler();
    this.buttonBackHandler();
    this.buttonMenuHandler();
    this.buttonRHandler();
    this.buttonQHandler();
  }

// button ArrowUp handler

  onLeft() {
    this.datepicker.focusDate(this.datepicker.calendar.getNext(this.datepicker.state.focusedDate, 'd', 1));
    this.datepicker.focusSelect();
  }

// button ArrowRight handler

  onRight() {
    this.datepicker.focusDate(this.datepicker.calendar.getPrev(this.datepicker.state.focusedDate, 'd', 1));
    this.datepicker.focusSelect();
  }

// button ArrowUp handler

  onUp() {
    this.datepicker.focusDate(this.datepicker.calendar.getPrev
      (this.datepicker.state.focusedDate, 'd', this.datepicker.calendar.getDaysPerWeek()));
    this.datepicker.focusSelect();
  }

// button ArrowDown handler

  onDown() {
    this.datepicker.focusDate(this.datepicker.calendar.getNext
      (this.datepicker.state.focusedDate, 'd', this.datepicker.calendar.getDaysPerWeek()));
    this.datepicker.focusSelect();
  }

  // button 6 handler

  on6() {
    this.datepicker.focusDate(this.datepicker.calendar.getNext
      (this.datepicker.state.focusedDate, 'm', 1));
    this.datepicker.focusSelect();
  }

// button 4 handler

  on4() {
    this.datepicker.focusDate(this.datepicker.calendar.getPrev
      (this.datepicker.state.focusedDate, 'm', 1));
    this.datepicker.focusSelect();
  }

// button 2 handler

  on2() {
    this.datepicker.focusDate(this.datepicker.calendar.getPrev
      (this.datepicker.state.focusedDate, 'y', 1));
    this.datepicker.focusSelect();
  }

// button 0 handler

  on0() {
    this.datepicker.focusDate(this.datepicker.calendar.getNext
      (this.datepicker.state.focusedDate, 'y', 1));
    this.datepicker.focusSelect();
  }

// button Enter handler (In CustomKeybordServise no default eventPropagination())
/**
 * Method emits this.dayTemplateData to SelectedDateServise.selectedDateDayInfoSubscribtion
 */
  onEnter() {
    const modelNgbDate = new NgbDate(this.model.year, this.model.month, this.model.day);
    const dayData = this.dayTemplateData(modelNgbDate) as IDayInfoModel;
    this.selectedDateServise.selectedDateDayInfoSubscribtion.next(dayData);
    this.navCtrl.navigateForward('day-view');
  }

  onBack() {
    console.log('menu pressed');
    this.navCtrl.navigateForward('basicdatepicker');
    this.emitDate(this.model);
  }

  onMenu() {
    console.log('back pressed');
    this.navCtrl.navigateForward('menu');
  }
/**
 * Methods check number of days for setting css classes
 */

/**
 * Method add custom data to let-data="data" in day-template #dt
 */

  dayTemplateData(date: NgbDate) {
    const gregorianDate = (this.calendar as NgbCalendarHebrew).toGregorian(date);
    this.jewishCalendar.setGregorianDate(gregorianDate.year, gregorianDate.month - 1, gregorianDate.day);
    return {
      gregorian: gregorianDate,
      yomtov: this.jewishCalendar.isYomTovAssurBemelacha(),
      holyday: this.jewishCalendar.isYomTov(),
      omer: this.jewishCalendar.getDayOfOmer(),
      chanukah: this.jewishCalendar.getDayOfChanukah(),
      // events: this.eventsService.getEventCalendarView(gregorianDate.year + '-' + gregorianDate.month + '-' + gregorianDate.day),
      // eventsTitles: this.eventsService.getEventDescriptionsCalendarView
      // (gregorianDate.year + '-' + gregorianDate.month + '-' + gregorianDate.day),
      // notifications: this.eventsService.getNotificationsNumberCalendarView
      // (gregorianDate.year + '-' + gregorianDate.month + '-' + gregorianDate.day),
      roshhodesh: this.jewishCalendar.isRoshChodesh(),
      holydayNumber: this.jewishCalendar.getYomTovIndex(),
      taanis: this.getTaanisName(this.jewishCalendar.isTaanis()),
      kidushLevana:  this.getKidushLavana(gregorianDate.day),
      parasha: this.jewishCalendar.getParsha(),
      specialParasha: this.jewishCalendar.getSpecialShabbos(),
      shabbatMevorachim: this.jewishCalendar.isShabbosMevorchim(),
      aseresYomei: this.jewishCalendar.isAseresYemeiTeshuva(),
      isYomShishi: this.isFriday(this.jewishCalendar.getDayOfWeek()),
      isShabbat: this.isSaturday(this.jewishCalendar.getDayOfWeek()),
      molad: this.jewishCalendar.getMoladAsDate().ts,
      candleLighting: this.jewishCalendar.hasCandleLighting()
    };
  }

  isFriday(dayNum: number) {
    if(dayNum === 6) {return true; } else {
      return false;
    }
  }
  isSaturday(dayNum: number) {
    if(dayNum === 7) {return true; } else {
      return false;
    }
  }

  getKidushLavana(day: number) {
    let data = new Date(this.jewishCalendar.getSofZmanKidushLevana15Days().ts);
    if (data.getDate() === day) {
      return data;
    } else { return false;}
  }

  getTaanisName(arg0: boolean) {
    if ( arg0 === true) {
    const hlNumber = this.jewishCalendar.getYomTovIndex();
    return hagim[+hlNumber]; } else {return false; }
  }


/**
 * Method return custom string for day in the <marquee> tag
 */
  getEventsData(): string {
    let holyday = '';
    let events = '';
    let parasha = '';
    let molad = '';
    const modelNgbDate = new NgbDate(this.model.year, this.model.month, this.model.day);
    if (this.dayTemplateData(modelNgbDate).holyday) {
      const hlNumber = this.dayTemplateData(modelNgbDate).holydayNumber;
      holyday = holyday + hagim[+hlNumber]; }
    if (this.dayTemplateData(modelNgbDate).omer !== -1) {
      holyday = holyday + ' OMER DAY: ' + this.dayTemplateData(modelNgbDate).omer.toFixed();
    }
    if (this.dayTemplateData(modelNgbDate).chanukah !== -1) {
      holyday = holyday + ' CHANUKAH DAY: ' + this.dayTemplateData(modelNgbDate).chanukah.toFixed();
    }
    if (this.dayTemplateData(modelNgbDate).shabbatMevorachim) {
      holyday = holyday + ' SHABBAT_MEVORACHIM ';
    }
    if (this.dayTemplateData(modelNgbDate).aseresYomei) {
      holyday = holyday + ' ASERES_YOMEI ';
    }
    if (this.dayTemplateData(modelNgbDate).taanis) {
      holyday = holyday + ' ' + this.dayTemplateData(modelNgbDate).taanis;
    }
    if (this.dayTemplateData(modelNgbDate).parasha){
      parasha = ' PARASHA: ' + Parsha[this.dayTemplateData(modelNgbDate).parasha];
    }
    if (this.dayTemplateData(modelNgbDate).specialParasha) {
      parasha = parasha + ' | SPECIAL_PARASHA: ' + Parsha[this.dayTemplateData(modelNgbDate).parasha];
    }
    // if (this.dayTemplateData(modelNgbDate).eventsTitles) {
    //   events = ' EVENTS: ' + (this.dayTemplateData(modelNgbDate).eventsTitles); }
    if (this.dayTemplateData(modelNgbDate).roshhodesh) {
      this.jewishCalendar.setGregorianDate(modelNgbDate.year, modelNgbDate.month - 1, modelNgbDate.day);
      molad = ' MOLAD: ' + this.datePipe.transform(this.dayTemplateData(modelNgbDate).molad, 'yyyy-MM-dd HH:mm');
    }
    if (this.dayTemplateData(modelNgbDate).shabbatMevorachim) {
      molad = ' MOLAD: ' + this.datePipe.transform(this.dayTemplateData(modelNgbDate).molad, 'yyyy-MM-dd HH:mm');
    }
    if (this.dayTemplateData(modelNgbDate).kidushLevana) {
      molad = molad + ' KIDUSH_LAVANA_15: ' + this.datePipe.transform(this.dayTemplateData(modelNgbDate).kidushLevana, 'yyyy-MM-dd HH:mm');
    }
    return holyday + events + parasha + molad;
  }

/**
 * Method convert date to string format
 */

  getHebrewDate(): string {
    return this.i18n.getDayNumerals(this.model) + ' ' + this.i18n.getMonthShortName(this.model.month)
    + ' ' + this.i18n.getYearNumerals(this.model.year);
  }
/**
 * Method convert date from hebrew format to gregorian format
 */

 // TODO: take data from dayTemplate

  getGeorgianDate(): string {
    const modelNgbDate = new NgbDate(this.model.year, this.model.month, this.model.day);
    const data = {gregorian: (this.calendar as NgbCalendarHebrew)
      .toGregorian(modelNgbDate)};
    return (data.gregorian.day + ' ' + data.gregorian.month
    + ' ' + data.gregorian.year).toString();
  }

/**
 * Method set model to today if model is undefined
 */

  selectToday() {
    this.model = this.calendar.getToday();
    this.emitDate(this.model);
  }

/**
 * Method conver hebrew model to gregorian model
 */

  convertGregorianModel(date: NgbDateStruct): NgbDateStruct {
    const modelNgbDate = new NgbDate(date.year, date.month, date.day);
    const data = (this.calendar as NgbCalendarHebrew)
      .toGregorian(modelNgbDate);
    return data;
  }

/**
 * Method emit hebrew and gregorian models to SelectedDateServise
 */

  emitDate(model: NgbDateStruct) {
    this.dates = {
      georgianDate: this.convertGregorianModel(model),
      hebrewDate: model
    };
    this.selectedDateServise.selectedDateSubscribtion.next(this.dates);
  }
}
