import { CanActivateFn } from '@angular/router';

export const investisseurGuard: CanActivateFn = (route, state) => {
  return true;
};
