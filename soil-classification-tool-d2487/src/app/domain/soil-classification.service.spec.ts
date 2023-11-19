import { TestBed } from '@angular/core/testing';

import { SoilClassificationService } from './soil-classification.service';

describe('SoilClassificationService', () => {
  let service: SoilClassificationService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(SoilClassificationService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
