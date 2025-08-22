import { ResolveFn } from '@angular/router';

export const projectResolver: ResolveFn<boolean> = (route, state) => {
  return true;
};
