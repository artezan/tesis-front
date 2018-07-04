import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DocxDataComponent } from './docx-data.component';

describe('DocxDataComponent', () => {
  let component: DocxDataComponent;
  let fixture: ComponentFixture<DocxDataComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DocxDataComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DocxDataComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
