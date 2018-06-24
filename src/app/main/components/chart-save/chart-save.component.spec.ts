import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ChartSaveComponent } from './chart-save.component';

describe('ChartSaveComponent', () => {
  let component: ChartSaveComponent;
  let fixture: ComponentFixture<ChartSaveComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ChartSaveComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ChartSaveComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
