import { Component, OnInit, HostListener } from '@angular/core';
import { Router } from '@angular/router';
import { GeoLocation, JewishCalendar, Parsha, YerushalmiYomiCalculator, YomiCalculator, Daf} from 'kosher-zmanim';
import { SelectedDateService } from '../core/services/selected-date.service';
import { IDates } from '../core/model/IDates';
import { NgbDateStruct } from '@ng-bootstrap/ng-bootstrap';
import { Rambam1JSON } from '../core/model/Rambam1JSON';

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
  rambam: string;
  chalakim: any;
  chalakimTohu: any;
  hebrewModel: NgbDateStruct;
  time: string;

  constructor(private router: Router, private selectedDateServise: SelectedDateService) { }

  ngOnInit(): void {
    const geoLocation: GeoLocation = new GeoLocation('Jerusalem' , 31.76832, 35.21371,
    779.46, 'Asia/Jerusalem');
  }

  ionViewWillEnter(): void{
    this.getDataString();
  }
  getDay(day: number) {
    if (day < 10) { return '0' + day; }
  }

  getGregorianDate(){
    this.model.year, this.model.month - 1, this.model.day
  }

  getDataString() {
      this.dates = this.selectedDateServise.selectedDateSubscribtion.getValue();
      this.model = this.dates.georgianDate;
      this.hebrewModel = this.dates.hebrewDate;
      this.jewishCalendar.setGregorianDate(this.model.year, this.model.month , this.model.day);
    // this.jewishCalendar.setJewishDate(this.hebrewModel.year, this.hebrewModel.month, this.hebrewModel.day);
      console.log(this.hebrewModel.year, this.hebrewModel.month, this.hebrewModel.day);
      this.time = '' + this.jewishCalendar.getGregorianYear() + 
      this.jewishCalendar.getGregorianMonth() + this.jewishCalendar.getGregorianDayOfMonth();
      console.log('data setted: ' + this.time);
      this.getDataDay();
  }
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
    this.masechtanumber = ('Masechta number: ' + this.dafYomiBavli.getMasechtaNumber());
    this.masechtajrs = this.dafYomiYerushalmi.getYerushalmiMasechta() + ' ' + this.dafYomiYerushalmi.getYerushlmiMasechtaTransliterated();
    this.masechtapagejrs = ('Daf: ' + this.dafYomiYerushalmi.getDaf());
    this.masechtanumberjrs = ('Masechta number: ' + this.dafYomiYerushalmi.getMasechtaNumber());
    const dateRambam = +('' + this.model.year + this.model.month + this.getDay(this.model.day));
    this.rambam = Rambam1JSON[dateRambam];
    console.warn(this.jewishCalendar.getDate());
  }
  @HostListener('document:menubutton')
  onMenu() {
    this.router.navigate(['hebrewdatepicker']);
  }
  @HostListener('document:keydown.q')
  onQ() {
    this.router.navigate(['hebrewdatepicker']);
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
