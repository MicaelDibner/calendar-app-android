import { Component, OnInit, HostListener } from '@angular/core';
import { IDates } from '../core/model/IDates';
import { NgbDateStruct, NgbDatepickerI18nHebrew, NgbDatepickerI18n } from '@ng-bootstrap/ng-bootstrap';
import { Router } from '@angular/router';
import { SelectedDateService } from '../core/services/selected-date.service';
import { RabbyJSON } from '../core/model/RabbyJSON';

/**
 * Page shows data about rabbyes for date, received from SelectedDateService
 */

@Component({
  selector: 'app-rabbi-view',
  templateUrl: './rabbi-view.page.html',
  styleUrls: ['./rabbi-view.page.scss'],
  providers: [
    {provide: NgbDatepickerI18n, useClass: NgbDatepickerI18nHebrew},
  ]
})
export class RabbiViewPage implements OnInit {
  dates: IDates;
  model: NgbDateStruct;
  hebrewModel: NgbDateStruct;
  date: string;
  strings: string[];

  constructor(private router: Router, private selectedDateServise: SelectedDateService, public i18n: NgbDatepickerI18n) { }

  ngOnInit() {
    this.getDataString();
  }

/**
 * Setting emitted date from SelectedDateService
 */

  ionViewWillEnter(): void{
    this.getDataString();
    this.getRabbyInfo();
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
