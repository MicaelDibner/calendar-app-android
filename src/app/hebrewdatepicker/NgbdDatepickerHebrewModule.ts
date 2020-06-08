import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import {DatepickerComponent} from './datepicker.component';
import { CommonModule } from '@angular/common';
import { HebrewDatepickerRoutingModule } from './hebrewdatepicker-routing.module';
import { CustomKeyboardService } from '../core/services/custom-keyboard.service';



@NgModule({
  imports: [CommonModule,
    FormsModule,
    NgbModule,
    HebrewDatepickerRoutingModule],
  declarations: [DatepickerComponent],
  bootstrap: [DatepickerComponent],
  providers: [CustomKeyboardService]
})
export class NgbdDatepickerHebrewModule {}
