import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { StudyViewPageRoutingModule } from './study-view-routing.module';

import { StudyViewPage } from './study-view.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    StudyViewPageRoutingModule
  ],
  declarations: [StudyViewPage]
})
export class StudyViewPageModule {}
