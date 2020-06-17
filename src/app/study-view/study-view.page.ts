import { Component, OnInit, HostListener, Renderer2, ElementRef, ViewChild } from '@angular/core';
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
import { NavController, IonContent } from '@ionic/angular';


/**
 * Page shows data about stydies for date, received from SelectedDateService
 */

@Component({
  selector: 'app-study-view',
  templateUrl: './study-view.page.html',
  styleUrls: ['./study-view.page.scss'],
})
export class StudyViewPage implements OnInit {
  @ViewChild('content') content: IonContent;
  @ViewChild('screen') contentDiv: ElementRef;
  scroll = 0;

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

  private buttonBackHandler;
  private buttonMenuHandler;
  private buttonRHandler;
  private buttonQHandler;
  private buttonUpHandler;
  private buttonDownHandler;

  constructor(private navCntrl: NavController, private renderer: Renderer2,
              private selectedDateServise: SelectedDateService, public translate: TranslateService,
    ) {}


    ionViewWillEnter(): void{
      this.getDataString();
      this.buttonBackHandler = this.renderer.listen('document', 'backbutton', () => this.onMenu());
      this.buttonMenuHandler = this.renderer.listen('document', 'menubutton', () => this.onBack());
      this.buttonRHandler = this.renderer.listen('document', 'keydown.r', () => this.onMenu());
      this.buttonQHandler = this.renderer.listen('document', 'keydown.q', () => this.onBack());
      this.buttonUpHandler = this.renderer.listen('window', 'keydown.arrowup', (event) => this.onUp(event));
      this.buttonDownHandler  = this.renderer.listen('window', 'keydown.arrowdown', (event) => this.onDown(event));
    }


    ionViewWillLeave(): void{
      this.buttonBackHandler();
      this.buttonMenuHandler();
      this.buttonRHandler();
      this.buttonQHandler();
      this.buttonUpHandler();
      this.buttonDownHandler();
    }

    onMenu() {
      this.navCntrl.navigateForward('menu');
    }

    onBack() {
      this.navCntrl.navigateForward('rabbi-view');
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
      console.log(this.scroll);
    }

/**
 * Setting geolocation
 */

  ngOnInit(): void {
  }
/**
 * Setting emitted date from SelectedDateService
 */

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
}
