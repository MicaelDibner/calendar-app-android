import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { RabbiViewPage } from './rabbi-view.page';

const routes: Routes = [
  {
    path: '',
    component: RabbiViewPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class RabbiViewPageRoutingModule {}
