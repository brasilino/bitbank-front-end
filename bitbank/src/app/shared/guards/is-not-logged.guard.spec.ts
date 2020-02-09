import { TestBed, async, inject } from '@angular/core/testing';

import { IsNotLoggedGuard } from './is-not-logged.guard';

describe('IsNotLoggedGuard', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [IsNotLoggedGuard]
    });
  });

  it('should ...', inject([IsNotLoggedGuard], (guard: IsNotLoggedGuard) => {
    expect(guard).toBeTruthy();
  }));
});
