import { TestBed } from '@angular/core/testing';

import { Polo } from './polo';

describe('Polo', () => {
  let service: Polo;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(Polo);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
