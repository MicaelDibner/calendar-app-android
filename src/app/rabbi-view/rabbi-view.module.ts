import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { RabbiViewPageRoutingModule } from './rabbi-view-routing.module';

import { RabbiViewPage } from './rabbi-view.page';
import { NavigationButtonsModule } from '../navigation-buttons/navigation-buttons.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RabbiViewPageRoutingModule,
    NavigationButtonsModule
  ],
  declarations: [RabbiViewPage]
})
export class RabbiViewPageModule {}
