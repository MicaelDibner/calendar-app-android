import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { DayViewPageRoutingModule } from './day-view-routing.module';

import { DayViewPage } from './day-view.page';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { MenuPageModule } from '../menu/menu.module';
import { NavigationButtonsComponent } from '../navigation-buttons/navigation-buttons.component';
import { AppModule } from '../app.module';
import { NavigationButtonsModule } from '../navigation-buttons/navigation-buttons.module';
import { NavigationBarModule } from '../navigation-bar/navigation-bar.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    NgbModule,
    DayViewPageRoutingModule,
    MenuPageModule,
    NavigationButtonsModule,
    NavigationBarModule
  ],
  declarations: [DayViewPage]
})
export class DayViewPageModule {}
