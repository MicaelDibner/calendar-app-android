import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-navigation-buttons',
  templateUrl: './navigation-buttons.component.html',
  styleUrls: ['./navigation-buttons.component.scss'],
})
export class NavigationButtonsComponent implements OnInit {
  @Input() leftbutton: string;
  @Input() rightbutton: string;

  constructor() { }

  ngOnInit() {}

}
