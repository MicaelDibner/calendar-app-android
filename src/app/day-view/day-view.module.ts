import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { DayViewPageRoutingModule } from './day-view-routing.module';

import { DayViewPage } from './day-view.page';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { MenuPageModule } from '../menu/menu.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    NgbModule,
    DayViewPageRoutingModule,
    MenuPageModule
  ],
  declarations: [DayViewPage]
})
export class DayViewPageModule {}
