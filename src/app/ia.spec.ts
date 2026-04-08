import { TestBed } from '@angular/core/testing';

import { IA } from './ia';

describe('IA', () => {
  let service: IA;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(IA);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
