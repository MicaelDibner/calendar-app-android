import {Component, OnInit, OnDestroy, ViewChild, HostListener, AfterViewInit, Renderer2} from '@angular/core';
import {NgbDateStruct, NgbCalendar, NgbDatepickerI18nHebrew, NgbDatepicker, NgbCalendarHebrew, NgbDate, NgbDatepickerKeyboardService} from '@ng-bootstrap/ng-bootstrap';
import { SelectedDateService } from '../core/services/selected-date.service';
import { IDates } from '../core/model/IDates';
import { DayTemplateContext } from '@ng-bootstrap/ng-bootstrap/datepicker/datepicker-day-template-context';
import { Router } from '@angular/router';
import { CustomKeyboardService } from '../core/services/custom-keyboard.service';
import { NavController } from '@ionic/angular';
import { JewishCalendar, Parsha } from 'kosher-zmanim';
import { EventsService } from '../core/services/events.service';
import { DatePipe } from '@angular/common';
import { IDayInfoModel } from '../core/model/IDayInfoModel';

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

@Component({
  selector: 'app-basicdatepicker',
  templateUrl: './basicdatepicker.component.html',
  styleUrls: ['./basicdatepicker.component.css'],
  providers: [NgbDatepickerI18nHebrew, NgbCalendarHebrew,
    {provide: NgbDatepickerKeyboardService, useClass: CustomKeyboardService},
    DatePipe ]
})
export class BasicdatepickerComponent implements OnInit {
  @ViewChild('dp') datepicker: NgbDatepicker;

  dates: IDates;
  model: NgbDateStruct;
  hebrewDateModel: NgbDateStruct;
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
  private buttonDownKeyUpHandler;
  jewishCalendar = new JewishCalendar();
  countPress = 0;
  openMenu: boolean = false;

  constructor(private calendar: NgbCalendar, private selectedDateServise: SelectedDateService,
              public i18n: NgbDatepickerI18nHebrew, private hebrewCalendar: NgbCalendarHebrew,
              private navCntrl: NavController, private renderer: Renderer2, public eventsService: EventsService,
              private datePipe: DatePipe ) {
                this.dayTemplateData = this.dayTemplateData.bind(this);
                this.jewishCalendar.setInIsrael(true);
                this.jewishCalendar.setUseModernHolidays(false);
  }

  ngOnInit(): void {
    this.dates = this.selectedDateServise.selectedDateSubscribtion.getValue();
    this.model = new NgbDate(this.dates.georgianDate.year, this.dates.georgianDate.month,
        this.dates.georgianDate.day);
    this.hebrewDateModel = this.dates.hebrewDate;
    }

  ionViewWillEnter(): void{
    this.dates = this.selectedDateServise.selectedDateSubscribtion.getValue();
    this.model = new NgbDate(this.dates.georgianDate.year, this.dates.georgianDate.month,
    this.dates.georgianDate.day);
    this.datepicker.focusDate(this.model);
    this.datepicker.focusSelect();
    this.datepicker.focus();
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
    this.buttonDownKeyUpHandler = this.renderer.listen('window', 'keyup.arrowdown', () => this.onDownUp());

  }

  ionViewWillLeave(): void{
    console.log('user leave');
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
    this.buttonDownKeyUpHandler();
    this.openMenu = false;
  }

  onDownUp(): boolean | void {
    if(this.countPress <= 15){
    this.datepicker.focusDate(this.datepicker.calendar.getNext
    (this.datepicker.state.focusedDate, 'd', this.datepicker.calendar.getDaysPerWeek()));
    this.datepicker.focusSelect();
    this.countPress = 0;
    } else {
      this.countPress = 0;
      if (!this.openMenu) {
      this.buttonRightHandler();
      this.buttonLeftHandler();
      this.buttonEnterHandler();
      this.openMenu = true;
      } else {
        this.openMenu = false;
        this.buttonRightHandler = this.renderer.listen('window', 'keydown.arrowright', () => this.onRight());
        this.buttonLeftHandler  = this.renderer.listen('window', 'keydown.arrowleft', () => this.onLeft());
        this.buttonEnterHandler = this.renderer.listen('window', 'keydown.enter', () => this.onEnter());
      }
    }
  }

  closeNavigationBar(event: boolean) {
    if(event === true) this.openMenu = !this.openMenu;
  }

// button ArrowUp handler

onLeft() {
  this.datepicker.focusDate(this.datepicker.calendar.getPrev(this.datepicker.state.focusedDate, 'd', 1));
  this.datepicker.focusSelect();
  console.log(this.model);
}

// button ArrowRight handler

onRight() {
  this.datepicker.focusDate(this.datepicker.calendar.getNext(this.datepicker.state.focusedDate, 'd', 1));
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
  this.countPress++;
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


  onMenu() {
    this.navCntrl.navigateForward('menu');
  }

  onBack() {
    this.navCntrl.navigateForward('times-view');
  }

/**
 * Method emits this.dayTemplateData to SelectedDateServise.selectedDateDayInfoSubscribtion
 */

  onEnter() {
    const modelNgbDate = new NgbDate(this.model.year, this.model.month, this.model.day);
    const dayData = this.dayTemplateData(modelNgbDate) as IDayInfoModel;
    this.selectedDateServise.selectedDateDayInfoSubscribtion.next(dayData);
    this.navCntrl.navigateForward('day-view');
  }

  dayTemplateData(date: NgbDate) {
    this.jewishCalendar.setGregorianDate(date.year, date.month - 1, date.day);
    console.log(date);
    return {
      gregorian: date,
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
      kidushLevana:  this.getKidushLavana(date.day),
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
    if (dayNum === 6) {return true; } else {
      return false;
    }
  }

  isSaturday(dayNum: number) {
    if (dayNum === 7) {return true; } else {
      return false;
    }
  }

  getKidushLavana(day: number) {
    let data = new Date(this.jewishCalendar.getSofZmanKidushLevana15Days().ts);
    if (data.getDate() === day) {
      return data;
    } else { return false; }
  }

  getTaanisName(arg0: boolean) {
    if ( arg0 === true) {
    const hlNumber = this.jewishCalendar.getYomTovIndex();
    return hagim[+hlNumber]; } else {return false; }
  }

  convertHebrewModel(date: NgbDateStruct): NgbDateStruct {
    const modelNgbDate = new NgbDate(date.year, date.month, date.day);
    const data = this.hebrewCalendar.fromGregorian(modelNgbDate);
    return data;
  }
 
  emitDate(model: NgbDateStruct) {
    this.dates = {
      georgianDate: model,
      hebrewDate: this.convertHebrewModel(model)
    };
    this.selectedDateServise.selectedDateSubscribtion.next(this.dates);
  }

  selectToday() {
    this.model = this.calendar.getToday();
  }

  getHebrewDate(): string {
    const hebrewModel = this.convertHebrewModel(this.model);
    return this.i18n.getDayNumerals(hebrewModel) + ' ' + this.i18n.getMonthFullName(this.model.month, this.model.year)
    + ' ' + this.i18n.getYearNumerals(hebrewModel.year);
  }

  getGeorgianDate(): string {
    return this.model.year + ' ' + this.model.month + ' ' + this.model.day;
  }

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

}
