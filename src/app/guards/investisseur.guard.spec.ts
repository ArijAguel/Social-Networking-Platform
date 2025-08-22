import { TestBed } from '@angular/core/testing';
import { CanActivateFn } from '@angular/router';

import { investisseurGuard } from './investisseur.guard';

describe('investisseurGuard', () => {
  const executeGuard: CanActivateFn = (...guardParameters) => 
      TestBed.runInInjectionContext(() => investisseurGuard(...guardParameters));

  beforeEach(() => {
    TestBed.configureTestingModule({});
  });

  it('should be created', () => {
    expect(executeGuard).toBeTruthy();
  });
});
