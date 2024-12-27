import { TestBed } from '@angular/core/testing';

import { DiscountsService } from './discountsservice.service';

describe('DiscountsserviceService', () => {
  let service: DiscountsService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(DiscountsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
