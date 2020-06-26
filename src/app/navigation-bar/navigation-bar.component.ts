import { Component, OnInit, OnDestroy, Renderer2, ViewChild } from '@angular/core';
import { IonTabs, IonTabBar } from '@ionic/angular';

@Component({
  selector: 'app-navigation-bar',
  templateUrl: './navigation-bar.component.html',
  styleUrls: ['./navigation-bar.component.scss'],
})
export class NavigationBarComponent implements OnInit, OnDestroy{
  private buttonLeftHandler;
  private buttonRightHandler;
  @ViewChild('myTabs', {read: IonTabs}) tabRef: IonTabs;

  routes = ['rabbi-view', 'study-view', 'times-today-view', 'times-view', 'basicdatepicker', 'hebrewdatepicker'];
  routeNumber = 5;
  value = "star";

  constructor( private renderer: Renderer2) { }

  ngOnInit() {
    console.log('component come');
    this.buttonLeftHandler  = this.renderer.listen('window', 'keydown.arrowleft', () => this.onLeft());
    this.buttonRightHandler = this.renderer.listen('window', 'keydown.arrowright', () => this.onRight());
  }

  ngOnDestroy(): void {
    console.log('component destroyed');
    this.buttonRightHandler();
    this.buttonLeftHandler();
  }
  ionViewWillEnter(): void{
  }
  // button ArrowLeft handler

  onLeft() {
    // if(this.routeNumber === 0) {this.routeNumber = 6; }
    // this.tabRef.select('rabbi-view');
    // console.log(this.tabRef.getSelected());
  }

// button ArrowRight handler

  onRight() {
    // if(this.routeNumber === 5) {this.routeNumber = - 1; }
    // this.tabRef.select('hebrewdatepicker');
    // console.log(this.tabRef.getSelected());
  }



}
