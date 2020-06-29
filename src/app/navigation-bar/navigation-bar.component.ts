import { Component, OnInit, OnDestroy, Renderer2, ViewChild, Input, ElementRef, ViewChildren, QueryList, Output, EventEmitter, AfterContentInit, AfterContentChecked, AfterViewInit } from '@angular/core';
import { IonTabs, IonTabBar, NavController } from '@ionic/angular';

@Component({
  selector: 'app-navigation-bar',
  templateUrl: './navigation-bar.component.html',
  styleUrls: ['./navigation-bar.component.scss'],
})
export class NavigationBarComponent implements OnInit, OnDestroy, AfterViewInit{
  private buttonLeftHandler;
  private buttonRightHandler;
  private buttonEnterHandler;
  @ViewChildren('buttons') components:QueryList<ElementRef>;
  @Input() currentItem: string;
  @Output() emitMenuClose = new EventEmitter<boolean>();
  selectedButton: ElementRef;

  routes = ['rabbi-view', 'study-view', 'times-today-view', 'times-view', 'basicdatepicker', 'hebrewdatepicker'];
  routeNumber = 0;
  countOpen = 0;
  refresh: any;

  constructor( private renderer: Renderer2, public navCtrl: NavController) {
  }
  ngAfterViewInit(): void {
    this.selectedButton = this.components.toArray()[this.routeNumber];
    console.log(this.selectedButton);
    this.renderer.setAttribute(this.selectedButton.nativeElement, 'class', 'selectedButton');
    // this.selectedButton.nativeElement.style.backgroundColor = '#5789D8';
  } 

  ngOnInit() {
    console.log('component come');
    this.buttonLeftHandler  = this.renderer.listen('window', 'keydown.arrowleft', () => this.onLeft());
    this.buttonRightHandler = this.renderer.listen('window', 'keydown.arrowright', () => this.onRight());
    this.buttonEnterHandler = this.renderer.listen('window', 'keydown.enter', () => this.onEnter());
    this.countMenuOpen();
    this.routeNumber = this.routes.indexOf(this.currentItem);
  }

  ngOnDestroy(): void {
    console.log('component destroyed');
    this.buttonRightHandler();
    this.buttonLeftHandler();
    this.buttonEnterHandler();
    this.countOpen = 0;
    clearInterval(this.refresh);
  }
  // button ArrowLeft handler

  onLeft() {
    this.renderer.setAttribute(this.selectedButton.nativeElement, 'class', 'button');
    if (this.routeNumber === 0) {this.routeNumber = 5; } else { this.routeNumber--; }
    console.log(this.components.toArray()[this.routeNumber].nativeElement['attributes'][1]['value']);
    this.selectedButton = this.components.toArray()[this.routeNumber];
    this.renderer.setAttribute(this.selectedButton.nativeElement, 'class', 'selectedButton');
    this.countOpen = 0;
  }

// button ArrowRight handler

  onRight() {
    this.renderer.setAttribute(this.selectedButton.nativeElement, 'class', 'button');
    if (this.routeNumber === 5) {this.routeNumber = 0; } else { this.routeNumber++; }
    console.log(this.components.toArray()[this.routeNumber].nativeElement['attributes'][1]['value']);
    this.selectedButton = this.components.toArray()[this.routeNumber];
    this.renderer.setAttribute(this.selectedButton.nativeElement, 'class', 'selectedButton');
    this.countOpen = 0;
  }

  onEnter() {
    this.emitMenuClose.emit(true);
    this.navCtrl.navigateForward(this.components.toArray()[this.routeNumber].nativeElement['attributes'][1]['value']);
    this.buttonRightHandler();
    this.buttonLeftHandler();
    this.buttonEnterHandler();
    console.log('nav enter navbar pressed');
  }

  countMenuOpen() {
    this.refresh = setInterval(() => {
      this.countOpen++;
      if (this.countOpen >= 3 ) {
        this.emitMenuClose.emit(true);
      }
    }, 1000);
  }
}
