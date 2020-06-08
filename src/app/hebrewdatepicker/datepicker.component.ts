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
export class DatepickerComponent implements OnInit {
  @ViewChild('dp') datepicker: NgbDatepicker;

  model: NgbDateStruct;
  gregorianModel: NgbDateStruct;
  dates: IDates;
  jewishCalendar = new JewishCalendar();
  private button1Handler;
  private button3Handler;
  private buttonEnterHandler;



  constructor(private calendar: NgbCalendar, public i18n: NgbDatepickerI18n,
              private selectedDateServise: SelectedDateService, public navCtrl: NavController,
              public eventsService: EventsService, private renderer: Renderer2,
              private datePipe: DatePipe) {
    this.dayTemplateData = this.dayTemplateData.bind(this);
    this.jewishCalendar.setInIsrael(true);
    this.jewishCalendar.setUseModernHolidays(false);
  }
  ngOnInit(): void {
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

  // ngAfterViewInit(): void {
  //   this.datepicker.focusDate(this.model);
  //   this.datepicker.focusSelect();
  //   this.datepicker.focus();
  // }

  ionViewWillEnter(): void{
    this.dates = this.selectedDateServise.selectedDateSubscribtion.getValue();
    this.model = this.dates.hebrewDate;
    this.datepicker.focusDate(this.model);
    this.datepicker.focusSelect();
    this.datepicker.focus();
    this.button1Handler = this.renderer.listen('document', 'keydown.1', event => this.onStar());
    this.button3Handler = this.renderer.listen('document', 'keydown.3', event => this.onGrid());
    this.buttonEnterHandler = this.renderer.listen('window', 'keydown.enter', event => this.onEnter());
  }

  ionViewWillLeave(): void{
    this.emitDate(this.model);
    this.button1Handler();
    this.button3Handler();
    this.buttonEnterHandler();
  }

  onGrid() {
    this.datepicker.onNavigateEvent(1);
  }

  onStar() {
    this.datepicker.onNavigateEvent(0);
  }
  onEnter() {
    const modelNgbDate = new NgbDate(this.model.year, this.model.month, this.model.day);
    const dayData = this.dayTemplateData(modelNgbDate) as IDayInfoModel;
    this.selectedDateServise.selectedDateDayInfoSubscribtion.next(dayData);
    this.navCtrl.navigateForward('day-view');
  }

  @HostListener('document:menubutton')
  onMenu() {
    console.log('menu pressed');
    this.navCtrl.navigateForward('basicdatepicker');
    this.emitDate(this.model);
  }
  @HostListener('document:keydown.q')
  onQ() {
    console.log('menu pressed');
    this.navCtrl.navigateForward('basicdatepicker');
  }
  @HostListener('document:backbutton')
  onBack() {
    console.log('back pressed');
    this.navCtrl.navigateForward('menu');
  }
  @HostListener('document:keydown.r')
  onR() {
    console.log('back pressed');
    this.navCtrl.navigateForward('menu');
  }

  isFriday = (date: NgbDate) =>  this.calendar.getWeekday(date) === 5;
  isSaturday = (date: NgbDate) =>  this.calendar.getWeekday(date) === 6;

  dayTemplateData(date: NgbDate) {
    const gregorianDate = (this.calendar as NgbCalendarHebrew).toGregorian(date);
    this.jewishCalendar.setGregorianDate(gregorianDate.year, gregorianDate.month - 1, gregorianDate.day);
    return {
      gregorian: gregorianDate,
      yomtov: this.jewishCalendar.isYomTovAssurBemelacha(),
      holyday: this.jewishCalendar.isYomTov(),
      omer: this.jewishCalendar.getDayOfOmer(),
      chanukah: this.jewishCalendar.getDayOfChanukah(),
      events: this.eventsService.getEventCalendarView(gregorianDate.year + '-' + gregorianDate.month + '-' + gregorianDate.day),
      eventsTitles: this.eventsService.getEventDescriptionsCalendarView
      (gregorianDate.year + '-' + gregorianDate.month + '-' + gregorianDate.day),
      notifications: this.eventsService.getNotificationsNumberCalendarView
      (gregorianDate.year + '-' + gregorianDate.month + '-' + gregorianDate.day),
      roshhodesh: this.jewishCalendar.isRoshChodesh(),
      holydayNumber: this.jewishCalendar.getYomTovIndex(),
      taanis: this.getTaanisName(this.jewishCalendar.isTaanis(), date),
      kidushLevana:  this.getKidushLavana(gregorianDate.day),
      parasha: this.jewishCalendar.getParsha(),
      specialParasha: this.jewishCalendar.getSpecialShabbos(),
      shabbatMevorachim: this.jewishCalendar.isShabbosMevorchim(),
      aseresYomei: this.jewishCalendar.isAseresYemeiTeshuva(),
      isYomShishi: this.isFriday(date),
      isShabbat: this.isSaturday(date),
      molad: this.jewishCalendar.getMoladAsDate().ts,
      candleLighting: this.jewishCalendar.hasCandleLighting()
    };
  }
  getKidushLavana(day: number) {
    let data = new Date(this.jewishCalendar.getSofZmanKidushLevana15Days().ts);
    if (data.getDate() === day) {
      return data;
    } else { return false;}
  }

  getTaanisName(arg0: boolean, date: NgbDate) {
    if ( arg0 === true) {
    const hlNumber = this.jewishCalendar.getYomTovIndex();
    return hagim[+hlNumber]; } else {return false; }

    // if ( arg0 === true) {
    //   switch (date.month) {
    //     case 1:
    //       if ( date.day === 3) {
    //         return 'TZOM GEDALYA';
    //       } else if (date.day === 10) {
    //         return 'YOM HA-KIPURIM';
    //       } else { break; }
    //     case 4:
    //       return 'TZOM ASARA BE-TEVET';
    //     case 6:
    //       return 'TZOM ESTER';
    //     case 10:
    //       return 'TZOM SHAVUA ESER ON TAMUZ';
    //     case 11:
    //       return 'TZOM TEISHA BE-AV';
    //     default:
    //       return false;
    //   }
    // }
  }
  getHebrewDate(): string {
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
    if (this.dayTemplateData(modelNgbDate).eventsTitles) {
      events = ' EVENTS: ' + (this.dayTemplateData(modelNgbDate).eventsTitles); }
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

  getGeorgianDate(): string {
    const modelNgbDate = new NgbDate(this.model.year, this.model.month, this.model.day);
    const data = {gregorian: (this.calendar as NgbCalendarHebrew)
      .toGregorian(modelNgbDate)};
    return (data.gregorian.day + ' ' + data.gregorian.month
    + ' ' + data.gregorian.year).toString();
  }

  selectToday() {
    this.model = this.calendar.getToday();
    this.emitDate(this.model);
  }

  convertGregorianModel(date: NgbDateStruct): NgbDateStruct {
    const modelNgbDate = new NgbDate(date.year, date.month, date.day);
    const data = (this.calendar as NgbCalendarHebrew)
      .toGregorian(modelNgbDate);
    return data;
  }

  emitDate(model: NgbDateStruct) {
    this.dates = {
      georgianDate: this.convertGregorianModel(model),
      hebrewDate: model
    };
    this.selectedDateServise.selectedDateSubscribtion.next(this.dates);
  }
}
