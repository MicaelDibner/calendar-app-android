import { Component, OnInit, HostListener } from '@angular/core';
import { Router } from '@angular/router';
import { GeoLocation, JewishCalendar, Parsha, YerushalmiYomiCalculator, YomiCalculator, Daf} from 'kosher-zmanim';
import { SelectedDateService } from '../core/services/selected-date.service';
import { IDates } from '../core/model/IDates';
import { NgbDateStruct } from '@ng-bootstrap/ng-bootstrap';
import { RambamCalculator } from '../core/RambamCalculator';
import { RambamPerek1NameJSON } from '../core/model/RambamPerek1NameJSON';
import { RambamPerek3NameJSON } from '../core/model/RambamPerek3NameJSON';
import { TanahCalculator } from '../core/TanahCalculator';
import { MishnaCalculator } from '../core/MishnaCalculator';
import { TanahNameJSON } from '../core/model/TanahNameJSON';
import { MishnaNameJSON } from '../core/model/MishnaNameJSON';
import { PerekYomiNameJSON } from '../core/model/PerekYomiNameJSON';
import { LikutyMoranNameJSON } from '../core/model/LikutyMoranNameJSON';
import { LikutyHalhotNameJSON } from '../core/model/LikutyHalhotNameJSON';
import { PerekYomiCalculator } from '../core/PerekYomiCalculator';
import { LikutyMoranCalculator } from '../core/LikutyMoranCalculator';
import { LikutyHalhotCalculator } from '../core/LikutyHalhotCalculator';
import { DersoMosharCalculator } from '../core/DersoMosharCalculator';
import { DersoMosharNameJSON } from '../core/model/DersoMosharNameJSON';
import { DersoHalhotNameJSON } from '../core/model/DersoHalhotNameJSON';
import { DersoHalhotCalculator } from '../core/DersoHalhotCalculator';
import { TranslateService } from '@ngx-translate/core';
import { HafetzHaimCalculator } from '../core/HafetzHaimCalculatorCalculator';
import { HafetzHaimRegularNameJSON } from '../core/model/HafetzHaimRegularNameJSON';
import { HafetzHaimLongNameJSON } from '../core/model/HafetzHaimLongNameJSON';

import { DateTime } from 'luxon';


/**
 * Page shows data about stydies for date, received from SelectedDateService
 */

@Component({
  selector: 'app-study-view',
  templateUrl: './study-view.page.html',
  styleUrls: ['./study-view.page.scss'],
})
export class StudyViewPage implements OnInit {
  jewishCalendar = new JewishCalendar();
  dates: IDates;
  model: NgbDateStruct;
  parsha: string;
  specialParsha: string;
  dafYomiYerushalmi: Daf;
  dafYomiBavli: Daf;
  masechta: string;
  masechtapage: string;
  masechtanumber: string;
  masechtajrs: string;
  masechtapagejrs: string;
  masechtanumberjrs: string;
  rambam1Daf: number;
  rambam3Daf: number;
  RambamPerek1NameJSON = RambamPerek1NameJSON;
  RambamPerek3NameJSON = RambamPerek3NameJSON;
  MishnaNameJSON = MishnaNameJSON;
  TanahNameJSON = TanahNameJSON;
  PerekYomiNameJSON = PerekYomiNameJSON;
  LikutyMoranNameJSON = LikutyMoranNameJSON;
  LikutyHalhotNameJSON = LikutyHalhotNameJSON;
  DersoMosharNameJSON = DersoMosharNameJSON;
  DersoHalhotNameJSON = DersoHalhotNameJSON;
  HafetzHaimRegularNameJSON = HafetzHaimRegularNameJSON;
  HafetzHaimLongNameJSON = HafetzHaimLongNameJSON;
  chalakim: any;
  chalakimTohu: any;
  hebrewModel: NgbDateStruct;
  time: string;
  tanah: number;
  mishna: number;
  perekYomi: number;
  LikutyMoran: number;
  likutyHalhot: number;
  dersoMoshar: number;
  dersoHalhot: number;
  hafetzHaim: number;

  constructor(private router: Router, private selectedDateServise: SelectedDateService, public translate: TranslateService,
    ) { 
      console.log('' + this.jewishCalendar.getJewishYear() + this.jewishCalendar.getJewishMonth() + this.jewishCalendar.getJewishDayOfMonth());
    }

/**
 * Setting geolocation
 */

  ngOnInit(): void {
    const geoLocation: GeoLocation = new GeoLocation('Jerusalem' , 31.76832, 35.21371,
    779.46, 'Asia/Jerusalem');
  }
/**
 * Setting emitted date from SelectedDateService
 */

  ionViewWillEnter(): void{
    this.getDataString();
  }

/**
 * Changing date format for Rambam1JSON class
 */

  getDay(day: number) {
    if (day < 10) { return '0' + day; }
  }

/**
 * Setting date from SelectedDateService and setting date for JewishCalendar instance
 */

  getDataString() {
      this.dates = this.selectedDateServise.selectedDateSubscribtion.getValue();
      this.model = this.dates.georgianDate;
      this.hebrewModel = this.dates.hebrewDate;
      let dateForCalendar: DateTime = DateTime.fromObject({
        year: this.model.year,
        month: this.model.month,
        day: this.model.day,
      });
      this.jewishCalendar.setDate(dateForCalendar);
      // this.jewishCalendar.setJewishMonth(this.hebrewModel.month);
      console.log(this.hebrewModel.year, this.hebrewModel.month, this.hebrewModel.day);
      this.time = '' + this.jewishCalendar.getGregorianYear() + 
      (this.jewishCalendar.getGregorianMonth() + 1) + this.jewishCalendar.getGregorianDayOfMonth();
      console.log('data setted: ' + this.time);
      this.getDataDay();
  }

/**
 * Setting date from JewishCalendar for component strings
 */

  getDataDay() {
    console.log('get data started');
    this.chalakim = this.jewishCalendar.getMolad().getMoladChalakim();
    this.chalakimTohu = this.jewishCalendar.getChalakimSinceMoladTohu();
    this.parsha = Parsha[this.jewishCalendar.getParsha()];
    this.specialParsha = Parsha[this.jewishCalendar.getParsha()];
    this.dafYomiYerushalmi = YerushalmiYomiCalculator.getDafYomiYerushalmi(this.jewishCalendar);
    this.dafYomiBavli = YomiCalculator.getDafYomiBavli(this.jewishCalendar);
    this.masechta = this.dafYomiBavli.getMasechta() + ' ' + this.dafYomiBavli.getMasechtaTransliterated();
    this.masechtapage = ('Daf: ' + this.dafYomiBavli.getDaf());
    this.masechtanumber = ('Masechta number: ' + (this.dafYomiBavli.getMasechtaNumber() + 1));
    this.masechtajrs = this.dafYomiYerushalmi.getYerushalmiMasechta() + ' ' + this.dafYomiYerushalmi.getYerushlmiMasechtaTransliterated();
    this.masechtapagejrs = ('Daf: ' + this.dafYomiYerushalmi.getDaf());
    this.masechtanumberjrs = ('Masechta number: ' + this.dafYomiYerushalmi.getMasechtaNumber());
    this.rambam1Daf = RambamCalculator.getRambam1Perek(this.jewishCalendar);
    this.rambam3Daf = RambamCalculator.getRambam3Perek(this.jewishCalendar);
    this.tanah = TanahCalculator.getTanahChapter(this.jewishCalendar);
    this.mishna = MishnaCalculator.getMishnaChapter(this.jewishCalendar);
    this.perekYomi = PerekYomiCalculator.getPerekYomiChapter(this.jewishCalendar);
    this.LikutyMoran = LikutyMoranCalculator.getLikutyMoranChapter(this.jewishCalendar);
    this.likutyHalhot = LikutyHalhotCalculator.getLikutyHalhotChapter(this.jewishCalendar);
    this.dersoMoshar = DersoMosharCalculator.getDersoMocharChapter(this.jewishCalendar);
    this.dersoHalhot = DersoHalhotCalculator.getDersoHalhotChapter(this.jewishCalendar);
    this.hafetzHaim = HafetzHaimCalculator.getHafetzHaimChapter(this.jewishCalendar);
  }
  @HostListener('document:menubutton')
  onMenu() {
    this.router.navigate(['rabbi-view']);
  }
  @HostListener('document:keydown.q')
  onQ() {
    this.router.navigate(['rabbi-view']);
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
