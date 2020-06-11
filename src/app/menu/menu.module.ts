import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { MenuPageRoutingModule } from './menu-routing.module';

import { MenuPage } from './menu.page';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { CreateEventComponent } from './create-event/create-event.component';
import { CreateNotificationComponent } from './create-notification/create-notification.component';

import { TranslateModule, TranslateLoader } from '@ngx-translate/core';
import { HttpClient } from '@angular/common/http';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    MenuPageRoutingModule,
    NgbModule,
    ReactiveFormsModule,
    TranslateModule.forChild()
  ],
  declarations: [MenuPage, CreateEventComponent, CreateNotificationComponent],
  exports: [CreateNotificationComponent]
})
export class MenuPageModule {}