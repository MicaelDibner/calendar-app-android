import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { CreateEventComponent } from './create-event/create-event.component';
import { CreateNotificationComponent } from './create-notification/create-notification.component';
import { MenuPage } from './menu.page';
import { SettingsComponent } from './settings/settings.component';
import { SetGeolocationComponent } from './set-geolocation/set-geolocation.component';
import { GeolocationComponent } from './geolocation/geolocation.component';

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
  },
  {
    path: 'settings', // child route path
    component: SettingsComponent // child route component that the router renders
  },
  {
    path: 'geolocation', // child route path
    component: GeolocationComponent // child route component that the router renders
  },
  {
    path: 'setgeolocation', // child route path
    component: SetGeolocationComponent // child route component that the router renders
  },
   ];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class MenuPageRoutingModule {}
