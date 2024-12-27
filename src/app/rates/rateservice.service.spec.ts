import { TestBed } from '@angular/core/testing';

import { RatesService } from './rateservice.service';

describe('RateserviceService', () => {
  let service: RatesService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(RatesService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
