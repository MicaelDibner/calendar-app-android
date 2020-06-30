import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { StudyViewPageRoutingModule } from './study-view-routing.module';

import { StudyViewPage } from './study-view.page';
import { TranslateModule } from '@ngx-translate/core';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    StudyViewPageRoutingModule,
    TranslateModule.forChild()
  ],
  declarations: [StudyViewPage]
})
export class StudyViewPageModule {}
