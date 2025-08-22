import { CanActivateFn } from '@angular/router';

export const ssoGuard: CanActivateFn = (route, state) => {
  return true;
};
