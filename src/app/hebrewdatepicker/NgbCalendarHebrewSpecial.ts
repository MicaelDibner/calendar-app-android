import { Injectable } from '@angular/core';
import { NgbCalendarHebrew, NgbDate, NgbPeriod } from '@ng-bootstrap/ng-bootstrap';
import { setHebrewMonth, setHebrewDay } from '../core/hebrew';

@Injectable()
export class NgbCalendarHebrewSpecial extends NgbCalendarHebrew {

    getNext(date: NgbDate, period: NgbPeriod = 'd', number = 1) {
      date = new NgbDate(date.year, date.month, date.day);

      switch (period) {
        case 'y':
          date.year += number;
          return date;
        case 'm':
          date = setHebrewMonth(date, number);
          return date;
        case 'd':
          return setHebrewDay(date, number);
        default:
          return date;
      }
    }

    getPrev(date: NgbDate, period: NgbPeriod = 'd', number = 1) { return this.getNext(date, period, -number); }
  }