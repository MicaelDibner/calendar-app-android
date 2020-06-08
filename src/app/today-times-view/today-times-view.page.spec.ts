import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { TodayTimesViewPage } from './today-times-view.page';

describe('TodayTimesViewPage', () => {
  let component: TodayTimesViewPage;
  let fixture: ComponentFixture<TodayTimesViewPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TodayTimesViewPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(TodayTimesViewPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
