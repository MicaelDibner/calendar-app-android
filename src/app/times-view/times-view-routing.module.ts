import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { TimesViewPage } from './times-view.page';

const routes: Routes = [
  {
    path: '',
    component: TimesViewPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class TimesViewPageRoutingModule {}
