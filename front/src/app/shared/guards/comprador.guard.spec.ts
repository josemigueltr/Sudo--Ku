import { TestBed } from '@angular/core/testing';

import { CompradorGuard } from './comprador.guard';

describe('CompradorGuard', () => {
  let guard: CompradorGuard;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    guard = TestBed.inject(CompradorGuard);
  });

  it('should be created', () => {
    expect(guard).toBeTruthy();
  });
});
