import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';;
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';

import {BasicdatepickerComponent} from './basicdatepicker.component';
import { CommonModule } from '@angular/common';
import { BasicDatepickerRoutingModule } from './basicdatepicker-routing.module';
import { NavigationButtonsComponent } from '../navigation-buttons/navigation-buttons.component';
import { NavigationButtonsModule } from '../navigation-buttons/navigation-buttons.module';
import { NavigationBarModule } from '../navigation-bar/navigation-bar.module';

@NgModule({
  imports: [CommonModule, FormsModule, NgbModule, BasicDatepickerRoutingModule,
    NavigationBarModule],
  declarations: [BasicdatepickerComponent],
  bootstrap: [BasicdatepickerComponent]
})
export class NgbdDatepickerBasicModule {}
