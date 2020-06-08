import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { BasicdatepickerComponent } from './basicdatepicker.component';

const routes: Routes = [
  {
    path: '',
    component: BasicdatepickerComponent,
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class BasicDatepickerRoutingModule {}
