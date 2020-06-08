import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { CreateEventComponent } from './create-event/create-event.component';
import { CreateNotificationComponent } from './create-notification/create-notification.component';
import { MenuPage } from './menu.page';

const routes: Routes = [
  {
    path: '',
    component: MenuPage,
  },
  {
    path: 'createEvent',
      component: CreateEventComponent,
  },
  {
    path: 'createNotification', // child route path
    component: CreateNotificationComponent // child route component that the router renders
  }, ];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class MenuPageRoutingModule {}
