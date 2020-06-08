import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { TimesViewPage } from './times-view.page';

describe('TimesViewPage', () => {
  let component: TimesViewPage;
  let fixture: ComponentFixture<TimesViewPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TimesViewPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(TimesViewPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
