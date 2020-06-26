import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NavigationBarComponent } from './navigation-bar.component';
import { IonicModule } from '@ionic/angular';



@NgModule({
  declarations: [NavigationBarComponent],
  imports: [
    CommonModule,
    IonicModule
  ],
  exports: [
    NavigationBarComponent
  ]
})
export class NavigationBarModule { }
