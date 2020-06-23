import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { TodayTimesViewPageRoutingModule } from './today-times-view-routing.module';

import { TodayTimesViewPage } from './today-times-view.page';
import { NavigationButtonsModule } from '../navigation-buttons/navigation-buttons.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    TodayTimesViewPageRoutingModule,
    NavigationButtonsModule
  ],
  declarations: [TodayTimesViewPage]
})
export class TodayTimesViewPageModule {}
