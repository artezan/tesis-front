import { TestBed, inject } from '@angular/core/testing';

import { TablesDataService } from './tables-data.service';

describe('TablesDataService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [TablesDataService]
    });
  });

  it('should be created', inject([TablesDataService], (service: TablesDataService) => {
    expect(service).toBeTruthy();
  }));
});
