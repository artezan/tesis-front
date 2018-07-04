import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BrainPredictionComponent } from './brain-prediction.component';

describe('BrainPredictionComponent', () => {
  let component: BrainPredictionComponent;
  let fixture: ComponentFixture<BrainPredictionComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BrainPredictionComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BrainPredictionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
