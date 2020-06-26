import { Component, OnInit, Input, OnDestroy } from '@angular/core';

@Component({
  selector: 'app-navigation-buttons',
  templateUrl: './navigation-buttons.component.html',
  styleUrls: ['./navigation-buttons.component.scss'],
})
export class NavigationButtonsComponent implements OnInit, OnDestroy {
  @Input() leftbutton: string;
  @Input() rightbutton: string;

  constructor() { }

  ngOnInit() {
  }

  ngOnDestroy(): void {
  }

}
