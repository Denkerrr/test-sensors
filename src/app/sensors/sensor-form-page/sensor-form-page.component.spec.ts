import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SensorFormPageComponent } from './sensor-form-page.component';

describe('SensorFormPageComponent', () => {
  let component: SensorFormPageComponent;
  let fixture: ComponentFixture<SensorFormPageComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SensorFormPageComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SensorFormPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
