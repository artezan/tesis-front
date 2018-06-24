import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { GeneratorChartComponent } from './generator-chart.component';

describe('GeneratorChartComponent', () => {
  let component: GeneratorChartComponent;
  let fixture: ComponentFixture<GeneratorChartComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ GeneratorChartComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GeneratorChartComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
