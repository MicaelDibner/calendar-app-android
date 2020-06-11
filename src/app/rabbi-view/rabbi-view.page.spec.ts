import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { RabbiViewPage } from './rabbi-view.page';

describe('RabbiViewPage', () => {
  let component: RabbiViewPage;
  let fixture: ComponentFixture<RabbiViewPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RabbiViewPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(RabbiViewPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
