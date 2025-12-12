import { TestBed } from '@angular/core/testing';

import { OrsApiService } from './orsApi.service';

describe('OrsService', () => {
  let service: OrsApiService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(OrsApiService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
