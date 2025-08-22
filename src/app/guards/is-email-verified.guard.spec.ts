import { TestBed } from '@angular/core/testing';
import { CanActivateFn } from '@angular/router';

import { isEmailVerifiedGuard } from './is-email-verified.guard';

describe('isEmailVerifiedGuard', () => {
  const executeGuard: CanActivateFn = (...guardParameters) => 
      TestBed.runInInjectionContext(() => isEmailVerifiedGuard(...guardParameters));

  beforeEach(() => {
    TestBed.configureTestingModule({});
  });

  it('should be created', () => {
    expect(executeGuard).toBeTruthy();
  });
});
