import { TestBed } from '@angular/core/testing'

import { OrsStore } from './ors-store.service'

describe('OrsStoreService', () => {
  let service: OrsStore

  beforeEach(() => {
    TestBed.configureTestingModule({})
    service = TestBed.inject(OrsStore)
  })

  it('should be created', () => {
    expect(service).toBeTruthy()
  })
})
