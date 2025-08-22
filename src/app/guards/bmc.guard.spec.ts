import {TestBed} from '@angular/core/testing';
import {CanActivateFn} from '@angular/router';

import {bmcGuard} from './bmc.guard';

describe('bmcGuard', () => {
  const executeGuard: CanActivateFn = (...guardParameters) =>
    TestBed.runInInjectionContext(() => bmcGuard(...guardParameters));

  beforeEach(() => {
    TestBed.configureTestingModule({});
  });

  it('should be created', () => {
    expect(executeGuard).toBeTruthy();
  });
});
