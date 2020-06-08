import {Injectable} from '@angular/core';
import {NgbDatepicker, NgbDatepickerKeyboardService} from '@ng-bootstrap/ng-bootstrap';
import { SelectedDateService } from './selected-date.service';
import { Router } from '@angular/router';
import { NavController } from '@ionic/angular';

const keyCode = {
  ArrowUp: 38,
  ArrowRight: 39,
  ArrowDown: 40,
  ArrowLeft: 37,
  Enter: 13,
  Escape: 27,
  Digit1: 49,
  Digit3: 51
};


@Injectable({
  providedIn: 'root'
})
@Injectable()
export class CustomKeyboardService extends NgbDatepickerKeyboardService {
  constructor(private selectedDateServise: SelectedDateService, private navCtrl: NavController) {
    super();
  }
  processKey(event: KeyboardEvent, dp: NgbDatepicker) {
    const state = dp.state;
    switch (event.keyCode) {
      case keyCode.ArrowLeft:
        dp.focusDate(dp.calendar.getPrev(state.focusedDate, 'd', 1));
        dp.focusSelect();
        event.preventDefault();
        event.stopPropagation();
        break;
      case keyCode.ArrowUp:
        dp.focusDate(dp.calendar.getPrev(state.focusedDate, 'd', dp.calendar.getDaysPerWeek()));
        dp.focusSelect();
        event.preventDefault();
        event.stopPropagation();
        break;
      case keyCode.ArrowRight:
        dp.focusDate(dp.calendar.getNext(state.focusedDate, 'd', 1));
        dp.focusSelect();
        event.preventDefault();
        event.stopPropagation();
        break;
      case keyCode.ArrowDown:
        dp.focusDate(dp.calendar.getNext(state.focusedDate, 'd', dp.calendar.getDaysPerWeek()));
        dp.focusSelect();
        event.preventDefault();
        event.stopPropagation();
        break;
      case keyCode.Enter:
        break;
      default:
        super.processKey(event, dp);
        return;
    }
  }
}
