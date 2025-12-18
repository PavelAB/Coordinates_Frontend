import { TestBed } from '@angular/core/testing';

import { SpotStoreService } from './spot-store.service';

describe('SpotStoreService', () => {
  let service: SpotStoreService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(SpotStoreService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
