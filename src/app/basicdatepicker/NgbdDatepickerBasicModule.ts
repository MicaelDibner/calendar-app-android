import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';;
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';

import {BasicdatepickerComponent} from './basicdatepicker.component';
import { CommonModule } from '@angular/common';
import { BasicDatepickerRoutingModule } from './basicdatepicker-routing.module';

@NgModule({
  imports: [CommonModule, FormsModule, NgbModule, BasicDatepickerRoutingModule],
  declarations: [BasicdatepickerComponent],
  bootstrap: [BasicdatepickerComponent]
})
export class NgbdDatepickerBasicModule {}
