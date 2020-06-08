import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { MenuPageRoutingModule } from './menu-routing.module';

import { MenuPage } from './menu.page';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { CreateEventComponent } from './create-event/create-event.component';
import { CreateNotificationComponent } from './create-notification/create-notification.component';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    MenuPageRoutingModule,
    NgbModule,
    ReactiveFormsModule
  ],
  declarations: [MenuPage, CreateEventComponent, CreateNotificationComponent],
  exports: [CreateNotificationComponent]
})
export class MenuPageModule {}
