import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TsTestComponent } from './ts-test.component';

describe('TsTestComponent', () => {
  let component: TsTestComponent;
  let fixture: ComponentFixture<TsTestComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TsTestComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TsTestComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
