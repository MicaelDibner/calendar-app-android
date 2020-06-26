import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import {DatepickerComponent} from './datepicker.component';
import { CommonModule } from '@angular/common';
import { HebrewDatepickerRoutingModule } from './hebrewdatepicker-routing.module';
import { CustomKeyboardService } from '../core/services/custom-keyboard.service';
import { NavigationButtonsModule } from '../navigation-buttons/navigation-buttons.module';
import { NavigationBarModule } from '../navigation-bar/navigation-bar.module';



@NgModule({
  imports: [CommonModule,
    FormsModule,
    NgbModule,
    HebrewDatepickerRoutingModule,
    NavigationButtonsModule,
    NavigationBarModule],
  declarations: [DatepickerComponent],
  bootstrap: [DatepickerComponent],
  providers: [CustomKeyboardService]
})
export class NgbdDatepickerHebrewModule {}
