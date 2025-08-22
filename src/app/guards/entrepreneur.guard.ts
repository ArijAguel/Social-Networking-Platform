import { CanActivateFn } from '@angular/router';

export const entrepreneurGuard: CanActivateFn = (route, state) => {
  return true;
};
