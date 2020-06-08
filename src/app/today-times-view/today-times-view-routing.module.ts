import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { TodayTimesViewPage } from './today-times-view.page';

const routes: Routes = [
  {
    path: '',
    component: TodayTimesViewPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class TodayTimesViewPageRoutingModule {}
