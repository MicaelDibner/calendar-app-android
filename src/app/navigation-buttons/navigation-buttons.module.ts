import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NavigationButtonsComponent } from './navigation-buttons.component';
import { IonicModule } from '@ionic/angular';



@NgModule({
  declarations: [ NavigationButtonsComponent],
  imports: [
    CommonModule,
    IonicModule
  ],
  exports: [NavigationButtonsComponent]
})
export class NavigationButtonsModule { }
