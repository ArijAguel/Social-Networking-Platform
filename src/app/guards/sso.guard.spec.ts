import { TestBed } from '@angular/core/testing';
import { CanActivateFn } from '@angular/router';

import { ssoGuard } from './sso.guard';

describe('ssoGuard', () => {
  const executeGuard: CanActivateFn = (...guardParameters) => 
      TestBed.runInInjectionContext(() => ssoGuard(...guardParameters));

  beforeEach(() => {
    TestBed.configureTestingModule({});
  });

  it('should be created', () => {
    expect(executeGuard).toBeTruthy();
  });
});
