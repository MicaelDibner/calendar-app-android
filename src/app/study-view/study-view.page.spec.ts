import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { StudyViewPage } from './study-view.page';

describe('StudyViewPage', () => {
  let component: StudyViewPage;
  let fixture: ComponentFixture<StudyViewPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ StudyViewPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(StudyViewPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
