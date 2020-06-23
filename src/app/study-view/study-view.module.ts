import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { StudyViewPageRoutingModule } from './study-view-routing.module';

import { StudyViewPage } from './study-view.page';
import { TranslateModule } from '@ngx-translate/core';
import { NavigationButtonsModule } from '../navigation-buttons/navigation-buttons.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    StudyViewPageRoutingModule,
    TranslateModule.forChild(),
    NavigationButtonsModule
  ],
  declarations: [StudyViewPage]
})
export class StudyViewPageModule {}
