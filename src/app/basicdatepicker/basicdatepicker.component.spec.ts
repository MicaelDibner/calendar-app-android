import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BasicdatepickerComponent } from './basicdatepicker.component';

describe('BasicdatepickerComponent', () => {
  let component: BasicdatepickerComponent;
  let fixture: ComponentFixture<BasicdatepickerComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BasicdatepickerComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BasicdatepickerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
