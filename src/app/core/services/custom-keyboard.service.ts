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

/**
 * Service rewrite behavior of NgbDatepickerKeyboardService
 */


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
        break;
      case keyCode.ArrowUp:
        break;
      case keyCode.ArrowRight:
        break;
      case keyCode.ArrowDown:
        break;
      case keyCode.Enter:
        break;
      default:
        super.processKey(event, dp);
        return;
    }
  }
}
