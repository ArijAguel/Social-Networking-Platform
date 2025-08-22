import { inject } from '@angular/core';
import { ResolveFn } from '@angular/router';
import { AdminApiService } from '../api/admin-api.service';

export const UserPerMontheResolver:ResolveFn<number[]> = (route, state) => {
  return inject(AdminApiService).getUserPerMonth();
};
