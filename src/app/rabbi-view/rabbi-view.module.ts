import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { RabbiViewPageRoutingModule } from './rabbi-view-routing.module';

import { RabbiViewPage } from './rabbi-view.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RabbiViewPageRoutingModule
  ],
  declarations: [RabbiViewPage]
})
export class RabbiViewPageModule {}
