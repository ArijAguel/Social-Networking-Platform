import { CanActivateFn } from '@angular/router';

export const coachGuard: CanActivateFn = (route, state) => {
  return true;
};
