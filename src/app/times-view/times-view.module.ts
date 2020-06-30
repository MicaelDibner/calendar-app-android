import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { TimesViewPageRoutingModule } from './times-view-routing.module';

import { TimesViewPage } from './times-view.page';
import { TranslateModule } from '@ngx-translate/core';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    TimesViewPageRoutingModule,
    TranslateModule.forChild()
  ],
  declarations: [TimesViewPage]
})
export class TimesViewPageModule {}
