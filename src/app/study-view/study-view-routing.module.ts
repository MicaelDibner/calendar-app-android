import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { StudyViewPage } from './study-view.page';

const routes: Routes = [
  {
    path: '',
    component: StudyViewPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class StudyViewPageRoutingModule {}
