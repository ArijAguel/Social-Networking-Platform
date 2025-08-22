import { inject } from '@angular/core';
import { ResolveFn } from '@angular/router';
import { AdminApiService } from '../api/admin-api.service';

export const CountParamResolver:ResolveFn<number[]> = (route, state) => {
  return inject(AdminApiService).getCountParam();
};
