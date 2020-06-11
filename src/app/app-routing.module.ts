import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: 'hebrewdatepicker',
    loadChildren: () => import('./hebrewdatepicker/NgbdDatepickerHebrewModule').then( m => m.NgbdDatepickerHebrewModule)
  },
  {
    path: '', redirectTo: 'hebrewdatepicker', pathMatch: 'full'
  },
  {
    path: 'basicdatepicker',
    loadChildren: () => import('./basicdatepicker/NgbdDatepickerBasicModule').then( m => m.NgbdDatepickerBasicModule)
  },
  {
    path: 'day-view',
    loadChildren: () => import('./day-view/day-view.module').then( m => m.DayViewPageModule)
  },
  {
    path: 'menu',
    loadChildren: () => import('./menu/menu.module').then( m => m.MenuPageModule)
  },
  {
    path: 'times-view',
    loadChildren: () => import('./times-view/times-view.module').then( m => m.TimesViewPageModule)
  },
  {
    path: 'today-times-view',
    loadChildren: () => import('./today-times-view/today-times-view.module').then( m => m.TodayTimesViewPageModule)
  },
  {
    path: 'study-view',
    loadChildren: () => import('./study-view/study-view.module').then( m => m.StudyViewPageModule)
  },
  {
    path: 'rabbi-view',
    loadChildren: () => import('./rabbi-view/rabbi-view.module').then( m => m.RabbiViewPageModule)
  },
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules,
      useHash: true }, )
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
