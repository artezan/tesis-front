import { TestBed, inject } from '@angular/core/testing';

import { ChartControllerService } from './chart-controller.service';

describe('ChartControllerService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [ChartControllerService]
    });
  });

  it('should be created', inject([ChartControllerService], (service: ChartControllerService) => {
    expect(service).toBeTruthy();
  }));
});
